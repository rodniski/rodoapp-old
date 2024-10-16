<script>
	import { Form } from '$components';
	import { BackgroundBoxes } from '$components';
</script>

<div
	class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900 p-60"
>
	<div
		class="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]"
	/>

	<BackgroundBoxes />
	<Form />
</div>
