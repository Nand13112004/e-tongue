import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Brain,
  Cpu,
  Leaf,
  Shield,
  Users,
  Target
} from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'IoT Integration',
    description: 'ESP32-powered E-Tongue device with real-time sensor data collection',
    color: 'text-blue-600'
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'AI-powered analysis to determine solution safety for specific conditions',
    color: 'text-purple-600'
  },
  {
    icon: Leaf,
    title: 'Ayurvedic Focus',
    description: 'Specialized for traditional healing solutions and natural remedies',
    color: 'text-green-600'
  },
  {
    icon: Shield,
    title: 'Safety First', 
    description: 'Preventing harmful applications through scientific analysis',
    color: 'text-orange-600'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-6">
            About E-Tongue For Dravya Analyzer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bridging ancient Ayurvedic wisdom with modern IoT technology to ensure 
            safe application of traditional healing solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <Card className="sensor-card p-6 h-full">
                  <Icon className={`w-10 h-10 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="p-8 bg-primary-light border-primary/20">
            <div className="text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                To create a safer bridge between traditional Ayurvedic healing practices 
                and modern healthcare by providing real-time analysis of solution properties, 
                helping users make informed decisions about topical applications for various 
                health conditions.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Multidisciplinary Innovation
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Healthcare</h3>
              <p className="text-sm text-muted-foreground">
                Evidence-based approach to traditional medicine safety
              </p>
            </Card>
            <Card className="p-6">
              <Cpu className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Technology</h3>
              <p className="text-sm text-muted-foreground">
                IoT sensors and machine learning algorithms
              </p>
            </Card>
            <Card className="p-6">
              <Leaf className="w-8 h-8 text-safe mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Tradition</h3>
              <p className="text-sm text-muted-foreground">
                Respecting ancient wisdom while ensuring safety
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;