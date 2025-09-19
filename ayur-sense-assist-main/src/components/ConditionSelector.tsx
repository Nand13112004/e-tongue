import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Flame, 
  Bandage, 
  Sparkles, 
  Bug,
  Plus,
  ArrowRight
} from 'lucide-react';
import type { Condition } from '@/pages/Index';
import heroImage from '@/assets/hero-device.jpg';

interface ConditionSelectorProps {
  onConditionSelect: (condition: Condition, custom?: string) => void;
}

const conditions = [
  {
    id: 'burnt' as Condition,
    title: 'Burnt',
    description: 'Burns from heat, fire, or hot surfaces',
    icon: Flame,
    gradient: 'from-orange-400/20 to-red-400/20',
    iconColor: 'text-orange-600'
  },
  {
    id: 'wound' as Condition,
    title: 'Wound',
    description: 'Cuts, scrapes, and open injuries',
    icon: Bandage,
    gradient: 'from-red-400/20 to-pink-400/20',
    iconColor: 'text-red-600'
  },
  {
    id: 'skin-irritation' as Condition,
    title: 'Skin Irritation',
    description: 'Rashes, allergic reactions, or inflammation',
    icon: Sparkles,
    gradient: 'from-purple-400/20 to-pink-400/20',
    iconColor: 'text-purple-600'
  },
  {
    id: 'bee-sting' as Condition,
    title: 'Bee Sting',
    description: 'Insect bites and stings',
    icon: Bug,
    gradient: 'from-yellow-400/20 to-orange-400/20',
    iconColor: 'text-yellow-700'
  },
];

const ConditionSelector = ({ onConditionSelect }: ConditionSelectorProps) => {
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [customCondition, setCustomCondition] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleConditionClick = (condition: Condition) => {
    if (condition === 'other') {
      setShowCustomInput(true);
      setSelectedCondition('other');
    } else {
      setSelectedCondition(condition);
      setShowCustomInput(false);
    }
  };

  const handleContinue = () => {
    if (selectedCondition) {
      onConditionSelect(
        selectedCondition,
        selectedCondition === 'other' ? customCondition : undefined
      );
    }
  };

  const isValidSelection = selectedCondition && 
    (selectedCondition !== 'other' || customCondition.trim());

  return (
    <div className="min-h-screen hero-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
        <img 
          src={heroImage} 
          alt="E-Tongue IoT Device" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-left"
              >
                <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                  What happened
                  <br />
                  <span className="text-white">to you?</span>
                </h1>
                <p className="text-xl text-white mb-8 max-w-xl leading-relaxed">
                  Let our AI-powered E-Tongue analyze the safety of your healing solution with real-time IoT sensor data
                </p>
                
                {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>IoT Sensors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Machine Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Ayurvedic Safe</span>
                  </div>
                </div> */}
              </motion.div>

              {/* Right Content - Condition Selector */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="glass p-8 rounded-3xl"
              >
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {conditions.map((condition, index) => {
                    const Icon = condition.icon;
                    return (
                      <motion.div
                        key={condition.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + 0.1 * index }}
                      >
                        <Card
                          className={`condition-card ${
                            selectedCondition === condition.id ? 'selected' : ''
                          }`}
                          onClick={() => handleConditionClick(condition.id)}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${condition.gradient} rounded-2xl`} />
                          <div className="relative z-10 text-center">
                            <Icon className={`w-8 h-8 ${condition.iconColor} mx-auto mb-3`} />
                            <h3 className="font-semibold text-foreground mb-1">
                              {condition.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {condition.description}
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
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Card
                    className={`condition-card mb-4 ${
                      selectedCondition === 'other' ? 'selected' : ''
                    }`}
                    onClick={() => handleConditionClick('other')}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-muted-foreground mr-2" />
                      <span className="font-medium text-foreground">
                        Other condition
                      </span>
                    </div>
                  </Card>

                  {showCustomInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mb-6"
                    >
                      <Input
                        placeholder="Describe your condition..."
                        value={customCondition}
                        onChange={(e) => setCustomCondition(e.target.value)}
                        className="bg-card/80 border-card-border backdrop-blur-sm"
                        autoFocus
                      />
                    </motion.div>
                  )}

                  {isValidSelection && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={handleContinue}
                        size="lg"
                        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                      >
                        Continue Analysis
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionSelector;