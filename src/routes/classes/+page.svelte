<script>
    import ClassItem from "../../components/ClassItem.svelte";
    import {authStore} from '../../store/store'

    let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let listOfClasses = [
        {
            courseId: 'Which course',
            courseDescription: 'Additional details',
            category: 'Category of the course',
            scheduleDay: 'The days of the course',
            period: 'Choose the period for your course',
        }
    ];

    let currClass = {
            courseId: '',
            courseDescription: '',
            category: '',
            scheduleDay: [],
            period: '',
        };
    
    let newClass = false;
    let error = false;

    function addClass() {
        if (!(currClass.scheduleDay.length > 0)) {
            alert("Select the days when there will be classes on this subject.");
            return;
        }
        if (!(currClass.courseId.trim().length > 0)) {
            alert("Course ID can't be empty");
            return;
        }
        error = false;
        if (!currAssignment) {
            error = true;
        }
        listOfClasses = [...listOfClasses, {courseId: currClass.courseId,
            courseDescription: currClass.courseDescription,
            category: currClass.category,
            scheduleDay: currClass.scheduleDay,
            period: currClass.period}];

        console.log('addClass ------>');
        for (let i = 0; i < listOfClasses.length; i++) {
            const classItem = listOfClasses[i];
            console.log('courseId:', classItem.courseId);
            console.log('course description:', classItem.courseDescription);
            console.log('category:', classItem.category);
            console.log('schedule days:', classItem.scheduleDay);
            console.log('period:', classItem.period);
            console.log('----------------------');
        }

        currClass = {
            courseId: '',
            courseDescription: '',
            category: '',
            scheduleDay: [],
            period: ''
        };
    }

    async function createNewClass() {
        newClass = !newClass;
    }

    function editCourse() {
        return ;
    }

    function removeCourse() {
        return ;
    }
</script>


{#if !authStore.loading}
    <div class="mainContainer">    
        <div class="headerContainer">
            <div class="headerBtns">
                {#if newClass}
                <h1>New Class</h1>
                <button on:click={createNewClass}>
                    <i class="fa-regular fa-newspaper" />
                    <p>Classes</p>
                </button>
                {:else}
                <h1>Classes</h1>
                <button on:click={createNewClass}>
                    <i class="fa-regular fa-newspaper" />
                    <p>New Class</p>
                </button>
                {/if}
                <button>
                    <i class="fa-regular fa-floppy-disk" />
                    <p>Save</p>
                </button>
            </div>
        </div>
        
        {#if newClass}
            <div class="form-container">
                <div class={"enterClass " + (error ? "errorBorder" : "")}>
                    <input bind:value={currClass.courseId} type="text" placeholder="Course ID"/>
                </div>
                <div class={"enterClass " + (error ? "errorBorder" : "")}>
                    <input bind:value={currClass.courseDescription} type="text" placeholder="Course Description"/>
                </div>
                <div class={"enterClass " + (error ? "errorBorder" : "")}>
                    <select bind:value={currClass.category} class="select-progress">
                        <option value="Period 1">Core course</option>
                        <option value="Period 2">Elective course</option>
                    </select>
                </div>
                <div class={"enterClass " + (error ? "errorBorder" : "")}>
                    <!-- <input bind:value={currClass.scheduleDay} type="week" placeholder="Schedule Day"/> -->
                    <div class="checkbox-label">
                        {#each daysOfWeek as day} 
                            <div class="checkboxDay">
                                <input type="checkbox" bind:group={currClass.scheduleDay} value={day}>  
                                {day}
                            </div>
                        {/each}
                    </div>
                </div>
                <div class={"enterClass " + (error ? "errorBorder" : "")}>
                    <select bind:value={currClass.progress} class="select-progress">
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                        <option value="Semester 3">Semester 3</option>
                        <option value="Semester 4">Semester 4</option>
                        <option value="Semester 5">Semester 5</option>
                        <option value="Semester 6">Semester 6</option>
                        <option value="Semester 7">Semester 7</option>
                        <option value="Semester 8">Semester 8</option>
                    </select>
                </div>
            </div>
            <!-- <button on:click={addAndSaveAssignment} class="confirm">ADD</button> -->
        {:else}
            <main>
                {#if listOfClasses}
                    {#if listOfClasses.length === 0}
                        <p>There is no classes!</p>
                    {/if}
                    {#each listOfClasses as course, index}
                        <ClassItem {course} {index} {removeCourse} {editCourse} />
                    {/each}
                {/if}
            </main>
        {/if}
    </div>
{/if}


<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        gap: 24px;
        padding: 24px;
        width: 100%;
        max-width: 80%;
        margin: 0 auto;
    }

    .headerContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerBtns {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .headerContainer button {
        background: #003c5b;
        color: white;
        padding: 10px 18px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .headerContainer button i {
        font-size: 1.1rem;
    }

    .headerContainer button:hover {
        opacity: 0.7;
    }

    .containerClasses {
        display: flex;
        flex-direction: column;
        margin: auto;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .enterClass {
        position: relative;
    }

    .enterClass input {
        width: 100%;
        padding: 10px;
        font-size: 1.4rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .errorBorder {
        border-color: coral !important;
    }

    .enterClass input {
        border-color: #003c5b;
    }

    .confirm {
        background-color: #003c5b;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 12px 24px;
        font-size: 1.4rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .confirm:hover {
        opacity: 0.7;
    }

    .select-progress {
        width: 100%;
        padding: 10px;
        font-size: 1.4rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }


    /* .enterClass.checkbox label {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
    } */

    .custom-checkbox {
        position: relative;
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
    }

    .custom-checkbox.checked {
        border-color: #4caf50;
        background-color: #4caf50;
    }

    .checkmark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background-color: white;
        display: none;
    }
/* 
    .custom-checkbox.checked .checkmark {
        display: block;
    } */

    .checkbox-label {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .checkboxDay {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 20px;
    }

    .custom-checkbox {
        width: 30px; /* Set the width of the checkbox */
        height: 30px; /* Set the height of the checkbox */
        border: 2px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .custom-checkbox.checked {
        border-color: #4caf50;
        background-color: #4caf50;
    }

    .checkmark {
        width: 16px; /* Set the width of the checkmark */
        height: 16px; /* Set the height of the checkmark */
        border-radius: 2px;
        background-color: white;
        display: none;
    }
/* 
    .custom-checkbox.checked .checkmark {
        display: block;
    } */
</style>