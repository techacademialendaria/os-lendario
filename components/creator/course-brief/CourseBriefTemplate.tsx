import React from 'react';
import { Section } from '@/types';
import CreatorTopbar from '../CreatorTopbar';
import { useCourseBrief } from './hooks';
import { DEFAULT_PIPELINE } from './data';
import {
  CourseSidebar,
  BriefHeader,
  BriefSectionNav,
  BriefFormSection,
  BriefNavigation,
} from './organisms';
import type { CourseBriefTemplateProps } from './types';

const CourseBriefTemplate: React.FC<CourseBriefTemplateProps> = ({
  setSection,
  courseTitle,
  onNavigate,
}) => {
  const {
    activeSection,
    briefData,
    isSaving,
    currentSectionData,
    progressPercent,
    totalSections,
    sections,
    setActiveSection,
    handleInputChange,
    addPainPoint,
    removePainPoint,
    handleSave,
    handleNext,
    handlePrevious,
  } = useCourseBrief();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        <CourseSidebar
          courseTitle={courseTitle}
          currentStep="brief"
          pipeline={DEFAULT_PIPELINE}
          onNavigate={onNavigate}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <BriefHeader
            progressPercent={progressPercent}
            isSaving={isSaving}
            onSave={handleSave}
          />

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl p-8">
              <div className="flex gap-8">
                <BriefSectionNav
                  sections={sections}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />

                <div className="flex-1 space-y-6">
                  <BriefFormSection
                    section={currentSectionData}
                    activeSection={activeSection}
                    briefData={briefData}
                    onInputChange={handleInputChange}
                    onAddPainPoint={addPainPoint}
                    onRemovePainPoint={removePainPoint}
                  />

                  <BriefNavigation
                    activeSection={activeSection}
                    totalSections={totalSections}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onComplete={() => onNavigate('research')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBriefTemplate;
