import { Card } from "@/components/ui/card"

interface PreviewProps {
  resumeData: any
}

export default function Preview({ resumeData }: PreviewProps) {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    projects,
    awards,
    volunteerExperiences,
    publications,
    languages,
    formatting,
  } = resumeData

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="text-center mb-6">
        {personalInfo?.profileImage && (
          <img
            src={personalInfo.profileImage || "/placeholder.svg"}
            alt="Profile"
            className="h-32 w-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold">{personalInfo?.fullName}</h1>
        <p className="text-gray-600">
          {personalInfo?.email} | {personalInfo?.phone}
        </p>
        <p className="text-gray-600">{personalInfo?.location}</p>
        {personalInfo?.linkedin && (
          <p className="text-blue-600">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        )}
        {personalInfo?.website && (
          <p className="text-blue-600">
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">
              Personal Website
            </a>
          </p>
        )}
      </div>

      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
          {workExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">
                {job.jobTitle} at {job.company}
              </h3>
              <p className="text-gray-600">
                {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : "Present"}
              </p>
              <p className="text-gray-600">{job.location}</p>
              <ul className="list-disc list-inside mt-2">
                {job.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{edu.degree}</h3>
              <p>
                {edu.institution}, {formatDate(edu.graduationDate)}
              </p>
              {edu.gpa && <p>GPA: {edu.gpa}</p>}
              {edu.coursework && <p>Relevant Coursework: {edu.coursework}</p>}
              {edu.honors && <p>Honors: {edu.honors}</p>}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <ul className="list-disc list-inside">
            {skills.map((skill, index) => (
              <li key={index}>
                {skill.name} - {skill.level}
              </li>
            ))}
          </ul>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p>{project.description}</p>
              <p>Technologies: {project.technologies}</p>
              {project.url && (
                <p>
                  URL:{" "}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    {project.url}
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {awards && awards.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Awards and Recognition</h2>
          {awards.map((award, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold">{award.name}</h3>
              <p>
                {award.organization}, {formatDate(award.date)}
              </p>
            </div>
          ))}
        </section>
      )}

      {volunteerExperiences && volunteerExperiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Volunteer Experience</h2>
          {volunteerExperiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">
                {exp.role} at {exp.organization}
              </h3>
              <p>
                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {publications && publications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Publications</h2>
          {publications.map((pub, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold">{pub.title}</h3>
              <p>
                {pub.publisher}, {formatDate(pub.date)}
              </p>
              {pub.url && (
                <p>
                  URL:{" "}
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    {pub.url}
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Languages</h2>
          <ul className="list-disc list-inside">
            {languages.map((lang, index) => (
              <li key={index}>
                {lang.language} - {lang.proficiency}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Card>
  )
}

