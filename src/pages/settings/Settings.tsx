import SettingsForm from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <div className="p-5 h-[calc(100vh-130px)]">
      <div className="h-full space-y-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
        </div>
        <SettingsForm />
      </div>
    </div>
  )
}
