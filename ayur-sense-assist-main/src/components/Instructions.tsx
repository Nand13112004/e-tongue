import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Beaker,
  Droplets,
  Zap,
  Play,
  CheckCircle
} from 'lucide-react';
import type { Condition } from '@/pages/Index';

interface InstructionsProps {
  condition: Condition;
  customCondition?: string;
  onStartTest: () => void;
}

const getConditionDisplayName = (condition: Condition, custom?: string) => {
  if (condition === 'other' && custom) return custom;
  
  const names = {
    'burnt': 'burn',
    'wound': 'wound',
    'skin-irritation': 'skin irritation',
    'bee-sting': 'bee sting',
    'other': 'condition'
  };
  
  return names[condition];
};

const steps = [
  {
    icon: Beaker,
    title: 'Prepare Solution',
    description: 'Prepare the Ayurvedic solution you wish to test in a clean container.',
    color: 'text-secondary'
  },
  {
    icon: Droplets,
    title: 'Dip E-Tongue',
    description: 'Carefully immerse the E-Tongue sensor probes into your prepared solution.',
    color: 'text-primary'
  },
  {
    icon: Zap,
    title: 'Start Analysis',
    description: 'Click "Start Test" to begin real-time analysis of your solution\'s properties.',
    color: 'text-accent'
  }
];

const Instructions = ({ condition, customCondition, onStartTest }: InstructionsProps) => {
  const conditionName = getConditionDisplayName(condition, customCondition);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Testing Solution for{' '}
            <span className="text-primary capitalize">{conditionName}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to safely analyze your Ayurvedic solution using our IoT E-Tongue device
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <Card className="sensor-card h-full text-center p-6">
                  <div className="flex flex-col items-center">
                    <div className="step-indicator completed mb-4">
                      {index + 1}
                    </div>
                    <Icon className={`w-12 h-12 ${step.color} mb-4`} />
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto p-6 mb-8 bg-safe-light border-safe/20">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-safe mr-3" />
              <span className="text-lg font-semibold text-safe">Ready to Test</span>
            </div>
            <p className="text-safe-foreground/80 text-sm">
              Ensure your E-Tongue device is connected and the solution is prepared
            </p>
          </Card>

          <Button
            onClick={onStartTest}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-12 py-4 text-lg"
          >
            <Play className="w-5 h-5 mr-3" />
            Start Test
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            The analysis typically takes 30-60 seconds to complete
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Instructions;