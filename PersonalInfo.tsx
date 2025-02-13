"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfoProps {
  updateResumeData: (data: object) => void
  data?: any
}

export default function PersonalInfo({ updateResumeData, data }: PersonalInfoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key])
      })
      if (data.profileImage) {
        setProfileImage(data.profileImage)
      }
    }
  }, [data, setValue])

  const onSubmit = (formData) => {
    updateResumeData({ personalInfo: { ...formData, profileImage } })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {profileImage ? (
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="profileImage">Upload Profile Image</Label>
          <Input type="file" id="profileImage" accept="image/*" onChange={handleImageUpload} className="mt-1" />
        </div>
      </div>

      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input type="text" id="fullName" {...register("fullName", { required: "Full name is required" })} />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input type="tel" id="phone" {...register("phone", { required: "Phone number is required" })} />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          {...register("location", { required: "Location is required" })}
          placeholder="City, State/Province, Country"
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
      </div>

      <div>
        <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
        <Input type="url" id="linkedin" {...register("linkedin")} />
      </div>

      <div>
        <Label htmlFor="website">Personal Website</Label>
        <Input type="url" id="website" {...register("website")} />
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          {...register("summary", {
            required: "Professional summary is required",
            maxLength: { value: 500, message: "Summary should not exceed 500 characters" },
          })}
          rows={4}
        />
        {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>}
        <p className="mt-1 text-sm text-gray-500">Maximum 500 characters</p>
      </div>

      <Button type="submit">Save and Continue</Button>
    </form>
  )
}

