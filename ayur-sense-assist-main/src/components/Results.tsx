import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  XCircle,
  RefreshCw,
  Home,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import type { Condition } from '@/pages/Index';

interface ResultsProps {
  condition: Condition;
  customCondition?: string;
  result: {
    safe: boolean;
    confidence: number;
    explanation: string;
  };
  onRestart: () => void;
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

const Results = ({ condition, customCondition, result, onRestart }: ResultsProps) => {
  const conditionName = getConditionDisplayName(condition, customCondition);
  const { safe, confidence, explanation } = result;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="mb-6">
            {safe ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-20 h-20 text-safe mx-auto" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              >
                <XCircle className="w-20 h-20 text-danger mx-auto" />
              </motion.div>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl font-bold mb-4"
          >
            {safe ? (
              <span className="text-safe">Solution is Safe</span>
            ) : (
              <span className="text-danger">Solution is NOT Safe</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-muted-foreground mb-2"
          >
            for application to your <span className="capitalize font-medium">{conditionName}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <Badge variant={safe ? "default" : "destructive"} className="px-3 py-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {confidence}% Confidence
            </Badge>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <Card className={`p-6 ${
            safe 
              ? 'bg-safe-light border-safe/20' 
              : 'bg-danger-light border-danger/20'
          }`}>
            <div className="flex items-start gap-3">
              {safe ? (
                <CheckCircle className="w-5 h-5 text-safe mt-0.5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-danger mt-0.5 flex-shrink-0" />
              )}
              <div>
                <h3 className={`font-semibold mb-2 ${
                  safe ? 'text-safe' : 'text-danger'
                }`}>
                  Analysis Explanation
                </h3>
                <p className={`text-sm ${
                  safe ? 'text-safe-foreground/80' : 'text-danger-foreground/80'
                }`}>
                  {explanation}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRestart}
              variant="outline"
              size="lg"
              className="px-8"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Test Another Solution
            </Button>
            
            <Button
              onClick={onRestart}
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8"
            >
              <Home className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            This analysis is for informational purposes only. 
            Always consult healthcare professionals for medical advice.
          </p>
        </motion.div>

        {!safe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8"
          >
            <Card className="p-4 bg-warning-light border-warning/20">
              <div className="flex items-center gap-2 text-warning text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">
                  Do not apply this solution to your {conditionName}
                </span>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Results;