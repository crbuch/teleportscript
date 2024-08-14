import Roact from "@rbxts/roact";
import { useEffect, withHooks } from "@rbxts/roact-hooked";

function PlayerLabel(props: { UserId: number }) {
	const btnRef = Roact.createRef<TextButton>();

	return (
		<frame Size={new UDim2(1, 0, 0, 25)} BackgroundTransparency={1} Key={tostring(props.UserId)}>
			<textbutton
				Ref={btnRef}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				Text={""}
				BorderSizePixel={0}
				BackgroundColor3={new Color3(0, 0, 0)}
				AutoButtonColor={false}
				Event={{
					MouseEnter: () => {
						game.GetService("TweenService")
							.Create(btnRef.getValue()!, new TweenInfo(0.25), {
								BackgroundTransparency: 0.75,
							})
							.Play();
					},
					MouseLeave: () => {
						game.GetService("TweenService")
							.Create(btnRef.getValue()!, new TweenInfo(0.25), {
								BackgroundTransparency: 1,
							})
							.Play();
					},
					MouseButton1Down: () => {
						const clkTween = game
							.GetService("TweenService")
							.Create(btnRef.getValue()!, new TweenInfo(0.075), {
								BackgroundColor3: new Color3(0.75, 0.75, 0.75),
							});

						clkTween.Play();

						clkTween.Completed.Connect(() => {
							game.GetService("TweenService")
								.Create(btnRef.getValue()!, new TweenInfo(0.075), {
									BackgroundColor3: new Color3(0, 0, 0),
								})
								.Play();
						});
					},
					MouseButton1Click: () => {
						const pivotLocation = (
							game
								.GetService("Players")
								.GetPlayerByUserId(props.UserId)!
								.Character!.FindFirstChild("HumanoidRootPart")! as Part
						).CFrame;

						game.GetService("Players").LocalPlayer.Character?.PivotTo(pivotLocation);
					},
				}}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={new UDim(0, 5)}
				></uilistlayout>

				<textlabel
					LayoutOrder={2}
					BackgroundTransparency={1}
					Text={game.GetService("Players").GetNameFromUserIdAsync(props.UserId)}
					Size={new UDim2(0, 0, 1, 0)}
					AutomaticSize={Enum.AutomaticSize.X}
					Font={Enum.Font.ArialBold}
					TextSize={14}
					TextColor3={new Color3(1, 1, 1)}
				></textlabel>
				<imagelabel
					Size={new UDim2(1, 0, 1, 0)}
					SizeConstraint={Enum.SizeConstraint.RelativeYY}
					LayoutOrder={1}
					Image={
						game
							.GetService("Players")
							.GetUserThumbnailAsync(
								props.UserId,
								Enum.ThumbnailType.HeadShot,
								Enum.ThumbnailSize.Size100x100,
							)[0]
					}
				>
					<uicorner CornerRadius={new UDim(1, 0)}></uicorner>
				</imagelabel>
			</textbutton>
			<frame
				Position={new UDim2(0, 0, 1, 0)}
				Size={new UDim2(1, 0, 0, 1)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BorderSizePixel={0}
				BackgroundTransparency={0.5}
			></frame>
		</frame>
	);
}

const Window = withHooks(function (props: Roact.PropsWithChildren) {
	const sfRef = Roact.createRef<ScrollingFrame>();
	const btnRef = Roact.createRef<TextButton>();

	useEffect(() => {
		spawn(() => {
			const scrollf = sfRef.getValue()!;

			for (const plr of game.GetService("Players").GetChildren()) {
				Roact.mount(<PlayerLabel UserId={(plr as Player).UserId}></PlayerLabel>, scrollf);
			}

			game.GetService("Players").PlayerAdded.Connect((plr: Player) => {
				Roact.mount(<PlayerLabel UserId={plr.UserId}></PlayerLabel>, scrollf);
			});
			game.GetService("Players").PlayerRemoving.Connect((plr: Player) => {
				scrollf.FindFirstChild(tostring(plr.UserId));
			});
		});
	});

	return (
		<frame
			Size={new UDim2(0.25 * 0.8, 0, 0.5 * 0.8, 0)}
			Position={new UDim2(0, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0, 0.5)}
			SizeConstraint={Enum.SizeConstraint.RelativeYY}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			<textbutton
				Ref={btnRef}
				ZIndex={2}
				Position={new UDim2(0, 2, 0, 0)}
				AnchorPoint={new Vector2(0, 0.5)}
				Size={new UDim2(0.15, 0, 0.15, 0)}
				SizeConstraint={Enum.SizeConstraint.RelativeXX}
				Text={"-"}
				Font={Enum.Font.ArialBold}
				TextScaled={true}
				TextColor3={new Color3(1, 1, 1)}
				BackgroundColor3={new Color3(0.3, 0.3, 0.3)}
				Event={{
					MouseEnter: () => {
						game.GetService("TweenService")
							.Create(btnRef.getValue()!, new TweenInfo(0.25), {
								BackgroundColor3: new Color3(0.3 * 0.75, 0.3 * 0.75, 0.3 * 0.75),
							})
							.Play();
					},
					MouseLeave: () => {
						game.GetService("TweenService")
							.Create(btnRef.getValue()!, new TweenInfo(0.25), {
								BackgroundColor3: new Color3(0.3, 0.3, 0.3),
							})
							.Play();
					},
					MouseButton1Down: () => {
						const clkTween = game
							.GetService("TweenService")
							.Create(btnRef.getValue()!, new TweenInfo(0.075), {
								BackgroundColor3: new Color3(0.5, 0.5, 0.5),
							});

						clkTween.Play();

						clkTween.Completed.Connect(() => {
							game.GetService("TweenService")
								.Create(btnRef.getValue()!, new TweenInfo(0.075), {
									BackgroundColor3: new Color3(0.3, 0.3, 0.3),
								})
								.Play();
						});
					},
					MouseButton1Click: () => {
						if (sfRef.getValue()!.Visible) {
							sfRef.getValue()!.Visible = false;
						} else {
							sfRef.getValue()!.Visible = true;
						}
					},
				}}
			>
				<uistroke
					Thickness={2}
					Color={new Color3(0.15, 0.15, 0.15)}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				></uistroke>
				<uicorner CornerRadius={new UDim(0.125, 0)}></uicorner>
			</textbutton>

			<scrollingframe
				Ref={sfRef}
				Size={new UDim2(1, 0, 1, 0)}
				BorderSizePixel={0}
				ScrollBarImageColor3={new Color3(1, 1, 1)}
				BackgroundColor3={new Color3(0.3, 0.3, 0.3)}
				ScrollBarThickness={6}
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
			>
				<uistroke
					Thickness={2}
					Color={new Color3(0.15, 0.15, 0.15)}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				></uistroke>
				<uicorner CornerRadius={new UDim(0.125, 0)}></uicorner>
				<uilistlayout Padding={new UDim(0, 2)}></uilistlayout>
			</scrollingframe>
		</frame>
	);
});
function TeleportUI() {
	return <Window />;
}

export { TeleportUI };
