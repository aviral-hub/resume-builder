import { useFieldArray, useForm } from "react-hook-form"

interface VolunteerExperienceProps {
  updateResumeData: (data: object) => void
}

export default function VolunteerExperience({ updateResumeData }: VolunteerExperienceProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      volunteerExperiences: [{ organization: "", role: "", startDate: "", endDate: "", description: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "volunteerExperiences",
  })

  const onSubmit = (data) => {
    updateResumeData({ volunteerExperiences: data.volunteerExperiences })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Volunteer Experience</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Volunteer Experience {index + 1}</h3>

          <div>
            <label
              htmlFor={`volunteerExperiences.${index}.organization`}
              className="block text-sm font-medium text-gray-700"
            >
              Organization
            </label>
            <input
              type="text"
              id={`volunteerExperiences.${index}.organization`}
              {...register(`volunteerExperiences.${index}.organization`, { required: "Organization is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.volunteerExperiences?.[index]?.organization && (
              <p className="mt-1 text-sm text-red-600">{errors.volunteerExperiences[index].organization.message}</p>
            )}
          </div>

          <div>
            <label htmlFor={`volunteerExperiences.${index}.role`} className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              id={`volunteerExperiences.${index}.role`}
              {...register(`volunteerExperiences.${index}.role`, { required: "Role is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.volunteerExperiences?.[index]?.role && (
              <p className="mt-1 text-sm text-red-600">{errors.volunteerExperiences[index].role.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`volunteerExperiences.${index}.startDate`}
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id={`volunteerExperiences.${index}.startDate`}
                {...register(`volunteerExperiences.${index}.startDate`, { required: "Start date is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.volunteerExperiences?.[index]?.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.volunteerExperiences[index].startDate.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor={`volunteerExperiences.${index}.endDate`}
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id={`volunteerExperiences.${index}.endDate`}
                {...register(`volunteerExperiences.${index}.endDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <p className="mt-1 text-sm text-gray-500">Leave blank if ongoing</p>
            </div>
          </div>

          <div>
            <label
              htmlFor={`volunteerExperiences.${index}.description`}
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id={`volunteerExperiences.${index}.description`}
              {...register(`volunteerExperiences.${index}.description`, { required: "Description is required" })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
            {errors.volunteerExperiences?.[index]?.description && (
              <p className="mt-1 text-sm text-red-600">{errors.volunteerExperiences[index].description.message}</p>
            )}
          </div>

          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove Volunteer Experience
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ organization: "", role: "", startDate: "", endDate: "", description: "" })}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Another Volunteer Experience
      </button>

      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save and Continue
      </button>
    </form>
  )
}

