import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConditionSelector from '@/components/ConditionSelector';
import Instructions from '@/components/Instructions';
import DataDashboard from '@/components/DataDashboard';
import Results from '@/components/Results';
import About from '@/components/About';
import Contact from '@/components/Contact';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Phone } from 'lucide-react';

export type Condition = 'burnt' | 'wound' | 'skin-irritation' | 'bee-sting' | 'other';
export type WorkflowStep = 'home' | 'instructions' | 'testing' | 'results' | 'about' | 'contact';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('home');
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [customCondition, setCustomCondition] = useState('');
  const [testResult, setTestResult] = useState<{
    safe: boolean;
    confidence: number;
    explanation: string;
  } | null>(null);

  const handleConditionSelect = (condition: Condition, custom?: string) => {
    setSelectedCondition(condition);
    if (custom) setCustomCondition(custom);
    setCurrentStep('instructions');
  };

  const handleStartTest = () => {
    setCurrentStep('testing');
  };

  const handleTestComplete = (result: { safe: boolean; confidence: number; explanation: string }) => {
    setTestResult(result);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setSelectedCondition(null);
    setCustomCondition('');
    setTestResult(null);
    setCurrentStep('home');
  };

  const renderHeader = () => {
    if (currentStep === 'home') return null;

    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep('home')}
              className="hover:bg-primary-light"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">
              E-Tongue Health Analyzer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep('about')}
              className="hover:bg-primary-light"
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep('contact')}
              className="hover:bg-primary-light"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
    );
  };

  const renderCurrentStep = () => {
    const baseClassName = currentStep === 'home' ? '' : 'pt-20';

    switch (currentStep) {
      case 'home':
        return (
          <ConditionSelector
            onConditionSelect={handleConditionSelect}
          />
        );
      case 'instructions':
        return (
          <div className={baseClassName}>
            <Instructions
              condition={selectedCondition!}
              customCondition={customCondition}
              onStartTest={handleStartTest}
            />
          </div>
        );
      case 'testing':
        return (
          <div className={baseClassName}>
            <DataDashboard
              condition={selectedCondition!}
              onTestComplete={handleTestComplete}
            />
          </div>
        );
      case 'results':
        return (
          <div className={baseClassName}>
            <Results
              condition={selectedCondition!}
              customCondition={customCondition}
              result={testResult!}
              onRestart={handleRestart}
            />
          </div>
        );
      case 'about':
        return (
          <div className={baseClassName}>
            <About />
          </div>
        );
      case 'contact':
        return (
          <div className={baseClassName}>
            <Contact />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderHeader()}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Index;