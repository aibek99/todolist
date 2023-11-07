<script>
    import AssignmentItem from "../../components/AssignmentItem.svelte";
    import { db } from "../../lib/firebase/firebase";
	import { authHandlers, authStore } from "../../store/store";
    import { getDoc, doc, setDoc } from 'firebase/firestore';


    let assignmentList = [
        {
            assignment: 'What to do',
            assignmentDetails: 'Additional details',
            courseId: 'Course ID',
            courseName: 'Course Name',
            dueDate: 'yyyy-mm-dd',
            daysLeft: 'X days', // X is the number of days left until the deadline
            progress: 'X%', // X is the completion progress percentage
            completed: false,
            courseLogo: 'path/to/course-logo.png'
        }
    ];
    let tmpAssignmentList = [];
    let isTmpAssignmentList = false;
    let currAssignment = {
            assignment: '',
            assignmentDetails: '',
            courseId: '',
            courseName: '',
            dueDate: '',
            daysLeft: '',
            progress: '',
            completed: false,
            courseLogo: ''
        };
    let error = false;
    let newAssignment = false;

    authStore.subscribe(curr => {
        assignmentList = curr.data.assignments;
    });

    function addAssignment() {
        if (!validateText(currAssignment.assignment)) {
            alert("Assignment field cannot be empty.");
            return;
        }

        if (!validateDate(currAssignment.dueDate)) {
            alert("Invalid date format or date is history. Please use date later than today and in this format YYYY-MM-DD.");
            return;
        }

        if (!validateProgress(currAssignment.completed)) {
            alert("Invalid value for Completed field.");
            return;
        }

        if (!validateURL(currAssignment.courseLogo)) {
            alert("Invalid URL format for Course Logo.");
            return;
        }
        error = false;
        if (!currAssignment) {
            error = true;
        }
        assignmentList = [...assignmentList, {assignment: currAssignment.assignment,
            assignmentDetails: currAssignment.assignmentDetails,
            courseId: currAssignment.courseId,
            courseName: currAssignment.courseName,
            dueDate: currAssignment.dueDate,
            daysLeft: currAssignment.daysLeft,
            progress: currAssignment.progress,
            completed: currAssignment.completed,
            courseLogo: currAssignment.courseLogo}];
        console.log('addAssignment ------>');
        for (let i = 0; i < assignmentList.length; i++) {
            const assignmentItem = assignmentList[i];
            console.log('Assignment:', assignmentItem.assignment);
            console.log('Details:', assignmentItem.assignmentDetails);
            console.log('Course ID:', assignmentItem.courseId);
            console.log('Course Name:', assignmentItem.courseName);
            console.log('Due Date:', assignmentItem.dueDate);
            console.log('Days Left:', assignmentItem.daysLeft);
            console.log('Progress:', assignmentItem.progress);
            console.log('Completed:', assignmentItem.completed);
            console.log('Course Logo:', assignmentItem.courseLogo);
            console.log('----------------------');
        }

        currAssignment = {
            assignment: '',
            assignmentDetails: '',
            courseId: '',
            courseName: '',
            dueDate: '',
            daysLeft: '',
            progress: '', 
            completed: false,
            courseLogo: ''
        };
    }

    function editAssignment(index) {
        let newAssignmentList = assignmentList.filter((val, i) => {
            console.log(i, index, i !== index);
            return i !== index;
        });
        currAssignment = assignmentList[index];
        isTmpAssignmentList = true;
        tmpAssignmentList = assignmentList;
        assignmentList = newAssignmentList;
        createNewAssignment();
    }

    function cancelEditAssignment() {
        assignmentList = tmpAssignmentList;
        tmpAssignmentList = [];
        isTmpAssignmentList = false;
        createNewAssignment();
    }

    function removeAssignment(index) {
        let newAssignmentList = assignmentList.filter((val, i) => {
            console.log(i, index, i !== index);
            return i !== index;
        });
        assignmentList = newAssignmentList;
    }
    
    async function createNewAssignment() {
        newAssignment = !newAssignment;
    }

    async function saveAssignments() {
        try {
            const userRef = doc(db, 'users', $authStore.user.uid);
            console.log('saveAssignments ------>');
            for (let i = 0; i < assignmentList.length; i++) {
                const assignmentItem = assignmentList[i];
                console.log('Assignment:', assignmentItem.assignment);
                console.log('Details:', assignmentItem.assignmentDetails);
                console.log('Course ID:', assignmentItem.courseId);
                console.log('Course Name:', assignmentItem.courseName);
                console.log('Due Date:', assignmentItem.dueDate);
                console.log('Days Left:', assignmentItem.daysLeft);
                console.log('Progress:', assignmentItem.progress);
                console.log('Completed:', assignmentItem.completed);
                console.log('Course Logo:', assignmentItem.courseLogo);
                console.log('----------------------');
            }

            await setDoc(
                userRef, 
                {
                    assignments: assignmentList,
                }, 
                {merge: true}
            );
            isTmpAssignmentList = false;
            tmpAssignmentList = [];
        } catch(err) {
            console.log("There was an error saving your information", err)
        }
        createNewAssignment();
    }

    function addAndSaveAssignment() {
        addAssignment();
        saveAssignments();
    }

    function validateText(value) {
        return value && value.trim().length > 0;
    }

    function validateDate(value) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(value)) {
            return false; // Invalid date format
        }

        const inputDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

        return inputDate > today;
    }

    function validateProgress(value) {
        return typeof value === 'boolean';
    }

    function validateURL(url) {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (url == "") return true;
        return regex.test(url);
    }
</script>

{#if !$authStore.loading}
    <div class="mainContainer">
        <div class="headerContainer">
            {#if !newAssignment}
                <div class="assignmentlist">
                    <div class="headerBtns">
                        <h1>Assignment List</h1>
                        <button on:click={createNewAssignment}>
                            <i class="fa-regular fa-newspaper" />
                            <p>New Assignment</p>
                        </button>   
                    </div>
                </div>
            {:else}
                <div class="newAssignment">
                    <div class="headerBtns">
                        <h1>New Assignment</h1>
                        <button on:click={cancelEditAssignment}>
                            <i class="fa-regular fa-newspaper" />
                            <p>Cancel</p>
                        </button>
                        <button on:click={addAndSaveAssignment}>
                            <i class="fa-regular fa-floppy-disk" />
                            <p>Save</p>
                        </button>
                    </div>
                </div>
            {/if}
        </div>
        {#if !newAssignment}
            <main>
                {#if assignmentList}
                    {#if assignmentList.length === 0}
                        <p>
                            You have not assignments!
                        </p>
                    {/if}
                    {#each assignmentList as assignment, index} 
                        <AssignmentItem {assignment} {index} {removeAssignment} {editAssignment} />
                    {/each}
                {/if}
            </main>
        {:else}
            <div class="form-container">
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <input bind:value={currAssignment.assignment} type="text" placeholder="Enter assignment"/>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <input bind:value={currAssignment.assignmentDetails} type="text" placeholder="Assignment's details"/>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <input bind:value={currAssignment.courseId} type="text" placeholder="Course ID"/>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <input bind:value={currAssignment.courseName} type="text" placeholder="Course Name"/>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <input bind:value={currAssignment.dueDate} type="date" placeholder="Due Date"/>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <input bind:value={currAssignment.daysLeft} type="text" placeholder="Days Left"/>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <select bind:value={currAssignment.progress} class="select-progress">
                        <option value="0">0%</option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                        <option value="75">75%</option>
                        <option value="100">100%</option>
                    </select>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <select bind:value={currAssignment.completed} class="select-progress">
                        <option value={false}>Not Completed</option>
                        <option value={true}>Completed</option>
                    </select>
                </div>
                <div class={"enterAssignment " + (error ? "errorBorder" : "")}>
                    <input bind:value={currAssignment.courseLogo} type="text" placeholder="Course Logo URL"/>
                </div>
            </div>
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

    main {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
    }    

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .enterAssignment {
        position: relative;
    }

    .enterAssignment input {
        width: 100%;
        padding: 10px;
        font-size: 1.4rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .errorBorder {
        border-color: coral !important;
    }

    .enterAssignment input {
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


    .enterAssignment.checkbox label {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

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

    .custom-checkbox.checked .checkmark {
        display: block;
    }
</style>
