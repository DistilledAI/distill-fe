const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-16 text-mercury-700">{label}</span>
    <span className="text-16 text-mercury-950 underline">{value}</span>
  </div>
)

const ProposalInfo = () => {
  return (
    <div className="space-y-1">
      <InfoRow label="DAO" value="MAX" />
      <InfoRow label="Creator" value="XAM" />
      <InfoRow label="Status" value="Open" />
      <InfoRow label="Time left" value="2 days" />
    </div>
  )
}

export default ProposalInfo
