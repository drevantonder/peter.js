import { q, sanityImage } from "groqd";

export const settingsSelection = {
  _type: q.literal('settings'),
  name: q.string(),
  logo: sanityImage('logo'),
}
