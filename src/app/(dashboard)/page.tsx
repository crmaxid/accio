import { redirect } from 'next/navigation'

// TODO: derive the default teamId from the user's session.
export default function RootPage() {
  redirect('/crmax')
}
