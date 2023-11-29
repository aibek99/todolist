<script>
	export let course;
	export let index;
	export let editClass;
	export let removeClass;
	export let viewClass;
</script>

<div class="course-container">
	<div class="course">
		<div class="column">
			<p class="label">Index</p>
			<p class="value">{index + 1}</p>
		</div>
		<div class="column">
			<p class="label">Course ID</p>
			<p class="value">{course.courseId}</p>
		</div>
		<div class="column">
			<p class="label">Course Description</p>
			<p class="value">{course.courseDescription}</p>
		</div>
		<div class="column">
			<p class="label">Category</p>
			<p class="value">{course.category}</p>
		</div>
		<div class="column">
			<p class="label">Schedule Day</p>
			<p class="value">{course.scheduleDay}</p>
		</div>
		<div class="column">
			<p class="label">Period</p>
			<p class="value">{course.period}</p>
		</div>
		<div class="actions">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- <i
				on:click={() => {
					viewClass(index);
				}}
				on:keydown={() => {}}
				class="fa-solid fa-list"
			/> -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i
				on:click={() => {
					editClass(index);
				}}
				on:keydown={() => {}}
				class="fa-solid fa-pen-to-square"
			/>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i
				on:click={() => {
					removeClass(index);
				}}
				on:keydown={() => {}}
				class="fa-regular fa-trash-can"
			/>
		</div>
	</div>
</div>

<style>
	.course-container {
		overflow-x: auto;
		white-space: nowrap;
	}

	.course {
		border-left: 1px solid cyan;
		padding: 8px 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.column {
		margin-right: 20px;
	}

	.label {
		font-weight: bold;
		margin-bottom: 5px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 14px;
		font-size: 1.3rem;
	}

	.actions i {
		cursor: pointer;
	}

	.actions i:hover {
		color: coral;
	}
</style>
