type Props = { params: Promise<{ team: string }> }

export default async function TeamDashboardPage({ params }: Props) {
  const { team } = await params

  return (
    <div className="text-muted-foreground flex flex-1 items-center justify-center rounded-xl border border-dashed">
      <p>Dashboard — {team}</p>
    </div>
  )
}
