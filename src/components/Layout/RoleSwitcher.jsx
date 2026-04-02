import React from "react";
import { User, Shield, Check } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoleSwitcher = () => {
  const { role, setRole } = useAppContext();

  return (
    <div className="flex items-center gap-2">
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[140px] bg-background border-none shadow-none hover:bg-accent transition-colors">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="viewer">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Viewer</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSwitcher;
