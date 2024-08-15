local a = {

	LocalScript={"Name", "Source", "ClassName"},
	ModuleScript={"Name", "Source", "ClassName"},
	Script={"Name", "Source", "ClassName"},
	Folder={"Name", "ClassName"}
}
local b = game:GetService("InsertService")
local function c(d, e)
	for f, g in pairs(d) do
		if g == e then
			return f
		end
	end
	return nil
end
local h = ""
local i
local function j(k)
	local d = {}
	for l, m in pairs(a[k.ClassName]) do
		i = k[m]
		h = typeof(i)
		if h == "CFrame" then
			d[m] = {i:GetComponents()}
		elseif h == "Vector3" then
			d[m] = {i.X, i.Y, i.Z}
		elseif h == "EnumItem" then
			d[m] = i.Name
		elseif h == "Color3" then
			d[m] = {i.R, i.G, i.B}
		else
			d[m] = i
		end
	end
	return d
end
local n = {}
local function o(k, p)
	local d = {Properties = j(k), Children = {}}
	table.insert(p, d)
	for l, g in pairs(k:GetChildren()) do
		o(g, d.Children)
	end
end
function n:Serialize(q)
	local r = {}
	o(q, r)
	return r[1]
end
local function s(t, u, v)
	t[v] = t[u]
	t[u] = nil
end
local function w(t)
	local x = a[t.ClassName]
	pcall(
		function()
			for f, g in pairs(x) do
				s(t, g, f)
			end
		end
	)
	return t
end
local function y(d)
	s(d, "Children", 1)
	s(d, "Properties", 2)
	d[2] = w(d[2])
	for l, g in pairs(d[1]) do
		y(g)
	end
end
function n:MinifyTable(z)
	y(z)
	return z
end
local function A(t)
	local x = a[t[1]]
	pcall(
		function()
			for f, g in pairs(x) do
				s(t, f, g)
			end
		end
	)
	return t
end
local function B(d)
	s(d, 1, "Children")
	s(d, 2, "Properties")
	d.Properties = A(d.Properties)
	for l, g in pairs(d.Children) do
		B(g)
	end
end
function n:UnminifyTable(z)
	B(z)
	return z
end

local function Encoding6Byte()
	local s = "";
	for i=1,6 do
		s = s.. string.char((math.random(0, 255)))
	end
	return s
end


local function C(k, p)
	if not k.Properties then
		return p
	end

	local D = Instance.new(k.Properties.ClassName)

	if(not D:IsA("PointLight")) then
		D:SetAttribute("ENCD", Encoding6Byte())
	end

	if D:IsA("BasePart") then
		D.TopSurface = Enum.SurfaceType.Smooth
		D.BottomSurface = Enum.SurfaceType.Smooth
		D.LeftSurface = Enum.SurfaceType.Smooth
		D.RightSurface = Enum.SurfaceType.Smooth
		D.Anchored = true
	elseif D:IsA("PointLight") then
		D.Shadows = true
	end
	D.Parent = p
	for f, g in pairs(k.Properties) do
		if f ~= "ClassName" and f ~= "MeshId" then
			local h = typeof(D[f])
			if h == "CFrame" then
				D[f] = CFrame.new(unpack(g))
			elseif h == "Vector3" then
				D[f] = Vector3.new(unpack(g))
			elseif h == "EnumItem" then
				D[f] = g
			elseif h == "Color3" then
				D[f] = Color3.new(unpack(g))
			else
				D[f] = g
			end
		end
	end
	for l, g in pairs(k.Children) do
		C(g, D)
	end
	return D
end
function n:Deserialize(q)
	return C(q)
end
