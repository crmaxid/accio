type Props = { params: Promise<{ teamId: string }> }

export default async function TeamDashboardPage({ params }: Props) {
  const { teamId } = await params

  return (
    <div className="text-muted-foreground flex flex-1 items-center justify-center rounded-xl border border-dashed">
      <p>Dashboard — {teamId}</p>
    </div>
  )
}
