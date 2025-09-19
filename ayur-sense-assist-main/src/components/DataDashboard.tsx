import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity,
  Thermometer,
  Droplets,
  Zap,
  Beaker,
  CheckCircle
} from 'lucide-react';
import type { Condition } from '@/pages/Index';

interface DataDashboardProps {
  condition: Condition;
  onTestComplete: (result: { safe: boolean; confidence: number; explanation: string }) => void;
}

interface SensorData {
  ph: number;
  tds: number;
  orp: number;
  temperature: number;
}

const DataDashboard = ({ condition, onTestComplete }: DataDashboardProps) => {
  const [sensorData, setSensorData] = useState<SensorData>({
    ph: 7.0,
    tds: 0,
    orp: 200,
    temperature: 23.5
  });

  // Fetch real TDS value from backend
  useEffect(() => {
    const fetchTds = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/tds');
        const data = await res.json();
        setSensorData(prev => ({ ...prev, tds: Number(data.tds) || 0 }));
      } catch (err) {
        // fallback: keep previous tds
      }
    };
    const interval = setInterval(fetchTds, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const [isCollecting, setIsCollecting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(45);

  // Simulate real-time data collection
  useEffect(() => {
    if (!isCollecting) return;

    const interval = setInterval(() => {
      setSensorData(prev => ({
        ph: Math.max(0, Math.min(14, prev.ph + (Math.random() - 0.5) * 0.2)),
        // tds is updated from backend, do not simulate here
        tds: prev.tds,
        orp: Math.max(-1000, Math.min(1000, prev.orp + (Math.random() - 0.5) * 30)),
        temperature: Math.max(0, prev.temperature + (Math.random() - 0.5) * 0.5)
      }));

      setProgress(prev => {
        const newProgress = prev + (100 / 45); // 45 seconds total
        if (newProgress >= 100) {
          setIsCollecting(false);
          return 100;
        }
        return newProgress;
      });

      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isCollecting]);

  // Auto-complete test when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && isCollecting) {
      setTimeout(() => {
        // Simulate ML analysis result
        const isSafe = Math.random() > 0.3; // 70% chance of being safe for demo
        const confidence = 85 + Math.random() * 10; // 85-95% confidence
        
        let explanation = '';
        if (condition === 'burnt') {
          explanation = isSafe 
            ? 'The pH level (6.8) and mineral content are suitable for burn treatment.'
            : 'The solution is too acidic (pH 4.2) and may irritate burned tissue.';
        } else if (condition === 'bee-sting') {
          explanation = isSafe
            ? 'The alkaline properties (pH 8.1) help neutralize bee sting acidity.'
            : 'High TDS levels indicate excessive minerals that may cause irritation.';
        } else {
          explanation = isSafe
            ? 'The solution properties fall within safe parameters for this condition.'
            : 'One or more parameters are outside the safe range for application.';
        }

        onTestComplete({
          safe: isSafe,
          confidence: Math.round(confidence),
          explanation
        });
      }, 2000);
    }
  }, [progress, isCollecting, condition, onTestComplete]);

  const sensorCards = [
    {
      icon: Droplets,
      label: 'pH Level',
      value: '-',
      unit: 'pH',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Beaker,
      label: 'TDS',
      value: Math.round(sensorData.tds).toString(),
      unit: 'ppm',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Zap,
      label: 'ORP',
      value: '-',
      unit: 'mV',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: '-',
      unit: '°C',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full max-w-6xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Analyzing Solution Properties
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Activity className="w-6 h-6 text-primary" />
            {/* <span className="text-lg text-muted-foreground">
              {isCollecting ? 'Collecting Data...' : 'Analysis Complete'}
            </span> */}
            {isCollecting && (
              <div className="flex gap-1">
                <div className="pulse-dot"></div>
                <div className="pulse-dot"></div>
                <div className="pulse-dot"></div>
              </div>
            )}
          </div>

          {/* <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {timeRemaining}s remaining
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div> */}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sensorCards.map((sensor, index) => {
            const Icon = sensor.icon;
            return (
              <motion.div
                key={sensor.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="sensor-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${sensor.bg}`}>
                      <Icon className={`w-5 h-5 ${sensor.color}`} />
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {sensor.label}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {sensor.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {sensor.unit}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Real-Time Readings
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-safe rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
            
            <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Time-series chart would appear here
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {!isCollecting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Card className="max-w-sm mx-auto p-6 bg-safe-light border-safe/20">
              <CheckCircle className="w-12 h-12 text-safe mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-safe mb-2">
                Data Collection Complete
              </h3>
              <p className="text-sm text-safe-foreground/80">
                Analyzing results with machine learning...
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DataDashboard;