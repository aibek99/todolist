<script>
	export let assignment;
	export let index;
	export let editAssignment;
	export let removeAssignment;
</script>

<div class="assignment-container">
	<div class="assignment">
		<div class="column">
			<p class="label">Index</p>
			<p class="value">{index + 1}</p>
		</div>
		<div class="column">
			<p class="label">Assignment</p>
			<p class="value">{assignment.assignment}</p>
		</div>
		<div class="column">
			<p class="label">Assignment Details</p>
			<p class="value">{assignment.assignmentDetails}</p>
		</div>
		<div class="column">
			<p class="label">Course ID</p>
			<p class="value">{assignment.courseId}</p>
		</div>
		<!-- <div class="column">
            <p class="label">Course Name</p>
            <p class="value">{assignment.courseName}</p>
        </div> -->
		<div class="column">
			<p class="label">Due Date</p>
			<p class="value">{assignment.dueDate}</p>
		</div>
		<div class="column">
			<p class="label">Days Left</p>
			<p class="value">{assignment.daysLeft}</p>
		</div>
		<div class="column">
			<p class="label">Progress</p>
			<p class="value">{assignment.progress}</p>
		</div>
		<div class="column">
			<p class="label">Completed</p>
			<p class="value">{assignment.completed ? 'Yes' : 'No'}</p>
		</div>
		<!-- <div class="column">
            <p class="label">Course Logo</p>
            <p class="value">{assignment.courseLogo}</p>
        </div> -->
		<div class="actions">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i
				on:click={() => {
					editAssignment(index);
				}}
				on:keydown={() => {}}
				class="fa-solid fa-pen-to-square"
			/>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i
				on:click={() => {
					removeAssignment(index);
				}}
				on:keydown={() => {}}
				class="fa-regular fa-trash-can"
			/>
		</div>
	</div>
</div>

<style>
	.assignment-container {
		overflow-x: auto;
		white-space: nowrap;
	}

	.assignment {
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
