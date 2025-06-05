import { motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const CodeEditor = React.lazy(() => import('../components/CodeEditor'));

const LandingPageBuilder = () => {
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block">Landing Page</span>
            <span className="block text-indigo-600">Code Editor</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Build stunning landing pages with our interactive code editor. Edit
            HTML, CSS, and JavaScript code and see the changes in real-time.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Suspense fallback={<div>Carregando editor...</div>}>
            <CodeEditor className="mb-12" />
          </Suspense>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mt-16 mb-12 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Real-time Preview</CardTitle>
                <CardDescription>
                  See your changes instantly with our real-time preview panel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Our editor features a split-view design that allows you to
                  write code on one side and see the results immediately on the
                  other.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Modern Development</CardTitle>
                <CardDescription>
                  Experience the power of modern web development tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Our editor includes syntax highlighting, code completion, and
                  other features to make your development experience smoother.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Responsive Design</CardTitle>
                <CardDescription>
                  Create landing pages that look great on any device.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Our templates include responsive design principles, ensuring
                  your landing pages look perfect on desktops, tablets, and
                  mobile devices.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-6 text-gray-500">
            Ready to start building your own landing pages? Try our code editor
            now!
          </p>
          <Button
            size="lg"
            className="text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started Free
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPageBuilder;
