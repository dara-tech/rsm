import React, { useState } from "react";
import PersonalDetailForm from "./form/PersonalDetailForm";
import SummaryForm from "./form/SummaryForm";
import ExperienceForm from "./form/ExperienceForm";
import EducationalForm from "./form/EducationalForm";
import SkillForm from "./form/SkillForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, HomeIcon } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeid } = useParams();

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4"
        ><Link to={"/dashboard"}>
          <Button>
            <HomeIcon />
          </Button>
        </Link>
        <ThemeColor /></div>
        

        <div className="flex items-center justify-center gap-4">
          {activeFormIndex > 1 && (
            <Button onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ChevronLeft className="p-1" />
            </Button>
          )}
          <Button
            // disabled={!enableNext} // Uncommented the disabled attribute
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ChevronRight className="p-1" />
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 && (
        <PersonalDetailForm enableNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 2 && (
        <SummaryForm enableNext={(v) => setEnableNext(v)} />
      )}
      {activeFormIndex === 3 && <ExperienceForm />}
      {activeFormIndex === 4 && <EducationalForm />}
      {activeFormIndex === 5 && <SkillForm />}
      {activeFormIndex === 6 && (
        <Navigate to={`/my-resume/${resumeid}/view`} />
      )}{" "}
      {/* Corrected curly braces */}
    </div>
  );
};

export default FormSection;
