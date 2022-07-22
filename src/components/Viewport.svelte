<script lang="ts">
	import {
		CheckpointConnection,
		IModelApp,
		ScreenViewport,
		ViewCreator3d
	} from '@itwin/core-frontend';
	import { onMount } from 'svelte';
	import { ElementSelectionListener } from '../utils/ElementSelectionListener';
	import Tools from './Tools.svelte';

	export let iTwinId: string;
	export let iModelId: string;

	let viewPortContainer: HTMLDivElement;
	onMount(async () => {
		const iModelConnection = await CheckpointConnection.openRemote(iTwinId, iModelId);
		if (iModelConnection) {
			// add a listener to selection events
			new ElementSelectionListener(iModelConnection);

			// obtain a viewState for the model and add it to a Viewport within the container
			const viewCreator = new ViewCreator3d(iModelConnection);
			const viewState = await viewCreator.createDefaultView();
			const vp = ScreenViewport.create(viewPortContainer, viewState);
			IModelApp.viewManager.addViewport(vp);
		}
	});
</script>

<main>
	<div bind:this={viewPortContainer} id="viewport-container" style="height: 100vh; width: 100%;" />
	<Tools />
</main>
