"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = {
  id: number;
  title: string;
  description: string;
  video: string;
};

export default function InstructionSteps({ steps }: { steps: Step[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  if (steps.length < 1) return;

  function nextStep() {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  }

  function previousStep() {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <div className="basis-2/5 lg:basis-1/4">
        <div className="w-full flex justify-between items-center">
          <button
            className={cn(
              "button flex gap-2 items-center hover:bg-neutral-800 rounded-xl py-1.5 px-4 border",
              currentStep <= 0 &&
                "text-neutral-500 hover:bg-transparent cursor-default"
            )}
            onClick={previousStep}
          >
            <ArrowLeft size={15} />
            <span>Prev</span>
          </button>
          <button
            className={cn(
              "button flex gap-2 items-center hover:bg-neutral-800 rounded-xl py-1.5 px-4 border",
              currentStep >= steps.length - 1 &&
                "text-neutral-500 hover:bg-transparent cursor-default"
            )}
            onClick={nextStep}
          >
            <span>Next</span>
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="pt-5 px-1">
          <h3 className="text-2xl font-black mb-2">
            {steps[currentStep].title}
          </h3>
          <p
            className="text-sm text-neutral-200 leading-6 instruction-step"
            dangerouslySetInnerHTML={{ __html: steps[currentStep].description }}
          ></p>
        </div>
      </div>

      <div className="basis-3/5 lg:basis-3/4 rounded-xl overflow-hidden border-2 aspect-video">
        <video
          src={steps[currentStep].video}
          className="w-full"
          controls={false}
          muted
          autoPlay
          playsInline
          loop
        ></video>
      </div>
    </div>
  );
}
