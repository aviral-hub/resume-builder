"use client"

import { useState, useEffect } from "react"
import PersonalInfo from "@/components/PersonalInfo"
import Summary from "@/components/Summary"
import WorkExperience from "@/components/WorkExperience"
import Education from "@/components/Education"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Awards from "@/components/Awards"
import VolunteerExperience from "@/components/VolunteerExperience"
import Publications from "@/components/Publications"
import Languages from "@/components/Languages"
import Formatting from "@/components/Formatting"
import Preview from "@/components/Preview"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Summary" },
  { id: 3, name: "Work Experience" },
  { id: 4, name: "Education" },
  { id: 5, name: "Skills" },
  { id: 6, name: "Projects" },
  { id: 7, name: "Awards" },
  { id: 8, name: "Volunteer Experience" },
  { id: 9, name: "Publications" },
  { id: 10, name: "Languages" },
  { id: 11, name: "Formatting" },
]

export default function Home() {
  const [step, setStep] = useState(1)
  const [resumeData, setResumeData] = useState({})

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      setResumeData(JSON.parse(savedData))
    }
  }, [])

  const updateResumeData = (sectionData: object) => {
    const updatedData = { ...resumeData, ...sectionData }
    setResumeData(updatedData)
    localStorage.setItem("resumeData", JSON.stringify(updatedData))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo updateResumeData={updateResumeData} data={resumeData.personalInfo} />
      case 2:
        return <Summary updateResumeData={updateResumeData} data={resumeData.summary} />
      case 3:
        return <WorkExperience updateResumeData={updateResumeData} data={resumeData.workExperience} />
      case 4:
        return <Education updateResumeData={updateResumeData} data={resumeData.education} />
      case 5:
        return <Skills updateResumeData={updateResumeData} data={resumeData.skills} />
      case 6:
        return <Projects updateResumeData={updateResumeData} data={resumeData.projects} />
      case 7:
        return <Awards updateResumeData={updateResumeData} data={resumeData.awards} />
      case 8:
        return <VolunteerExperience updateResumeData={updateResumeData} data={resumeData.volunteerExperience} />
      case 9:
        return <Publications updateResumeData={updateResumeData} data={resumeData.publications} />
      case 10:
        return <Languages updateResumeData={updateResumeData} data={resumeData.languages} />
      case 11:
        return <Formatting updateResumeData={updateResumeData} data={resumeData.formatting} />
      default:
        return <Preview resumeData={resumeData} />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-8">Build Your Professional Resume</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Progress</h2>
            <Progress value={(step / steps.length) * 100} className="mb-4" />
            <nav aria-label="Progress">
              <ol role="list" className="overflow-hidden">
                {steps.map((stepItem, stepIdx) => (
                  <li key={stepItem.name} className={`relative ${stepIdx !== steps.length - 1 ? "pb-4" : ""}`}>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-center group">
                      <span className="h-9 flex items-center">
                        <span
                          className={`relative z-10 w-8 h-8 flex items-center justify-center ${
                            step > stepItem.id
                              ? "bg-blue-600 rounded-full"
                              : step === stepItem.id
                                ? "border-2 border-blue-600 rounded-full"
                                : "border-2 border-gray-300 rounded-full"
                          }`}
                        >
                          {step > stepItem.id ? (
                            <svg
                              className="w-5 h-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <span className={`${step === stepItem.id ? "text-blue-600" : "text-gray-500"}`}>
                              {stepItem.id}
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="ml-4 min-w-0 flex flex-col">
                        <span
                          className={`text-sm font-medium ${step === stepItem.id ? "text-blue-600" : "text-gray-500"}`}
                        >
                          {stepItem.name}
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </Card>
        </div>
        <div className="lg:w-2/4">
          <Card className="p-6">
            {renderStep()}
            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep((prevStep) => Math.max(1, prevStep - 1))}
                variant="outline"
                disabled={step === 1}
              >
                Previous
              </Button>
              <Button onClick={() => setStep((prevStep) => Math.min(steps.length, prevStep + 1))} variant="default">
                {step === steps.length ? "Finish" : "Next"}
              </Button>
            </div>
          </Card>
        </div>
        <div className="lg:w-1/4">
          <Preview resumeData={resumeData} />
        </div>
      </div>
    </div>
  )
}

