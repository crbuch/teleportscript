import Roact from "@rbxts/roact";
import { TeleportUI } from "shared/Teleport";

const gui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));

gui.IgnoreGuiInset = true;

Roact.mount(<TeleportUI></TeleportUI>, gui);
