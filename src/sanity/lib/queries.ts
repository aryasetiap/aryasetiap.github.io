import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  techStack,
  repositoryUrl
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  techStack,
  repositoryUrl,
  content
}`

export const authorQuery = groq`*[_type == "author"][0] {
  _id,
  name,
  bio,
  "resumeUrl": resume.asset->url,
  socialLinks
}`
