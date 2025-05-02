import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AccreditedStatusList from "@/pages/settings/AccreditedStatus/AccreditedStatusList"
import RoleList from "@/pages/settings/Role/RoleList"
import StatusList from "@/pages/settings/Status/StatusList"
import { useState } from "react"
import { Separator } from "./ui/separator"

export default function SettingsForm() {
  const [activeTab, setActiveTab] = useState("status")

  return (
    <Card className="p-6 h-full">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 h-full">
        <aside className="lg:w-1/5">
          <nav className="flex flex-col space-y-1">
            <Button
              variant={activeTab === "status" ? "default" : "ghost"}
              className="justify-start font-normal"
              onClick={() => setActiveTab("status")}
            >
              Status
            </Button>
            <Separator />
            <Button
              variant={activeTab === "accredited_status" ? "default" : "ghost"}
              className="justify-start font-normal"
              onClick={() => setActiveTab("accredited_status")}
            >
              Accredited Status
            </Button>
            <Separator />
            <Button
              variant={activeTab === "role" ? "default" : "ghost"}
              className="justify-start font-normal"
              onClick={() => setActiveTab("role")}
            >
              Role
            </Button>
          </nav>
        </aside>
        <div className="flex-1 h-full">
          {activeTab === "status" && <StatusList />}
          {activeTab === "accredited_status" && <AccreditedStatusList />}
          {activeTab === "role" && <RoleList />}
        </div>
      </div>
    </Card>
  )
}
