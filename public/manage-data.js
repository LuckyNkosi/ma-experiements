
const getNewName = async () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    const response = await fetch('/getName');
    const data = await response.json();
    console.log('data', data);
    document.getElementById('userName').innerText = data.result;

    document.querySelectorAll('.existingUserFound').forEach(element => element.classList.add("hidden"));
    document.querySelectorAll('.newUser').forEach(element => element.classList.remove("hidden"));

    return data.result;
}
const getUser = () => {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    return { userName, userId };
};

const start = async () => {
    //save username to local storage
    const storedUser = getUser();
    if (!storedUser.userName && !storedUser.userId) {
        const userName = document.getElementById('userName').innerText;
        const response = await fetch('/addParticipant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: userName })
        });
        const data = await response.json();

        localStorage.setItem('userName', data.name);
        localStorage.setItem('userId', data.id);
    }
    window.location.href = '/drone';
}

const getData = async (tableName) => {
    if (!tableName) {
        console.error("table name cannot be empty");
        return 'table name cannot be empty';
    }
    console.log(`${BE_ENDPOINT}${tables[tableName]}`);
    const response = await fetch(`https://api.airtable.com/v0/meta/whoami`, {
        headers: new Headers({
            'Authorization': 'Bearer patoFMJULGlAxP8O1.0968d3145f2dca975dd91f74cd2c014a2c4fd6107304f1a1e5e26446bf91066e',
        }),
    });
    const data = await response.json();
    console.log('data', data);
    return data;
}


const init = () => {
    const { userName, userId } = getUser();
    if (userName && userId) {
        document.getElementById('userName').innerText = userName;
        document.querySelectorAll('.existingUserFound').forEach(element => element.classList.remove("hidden"));
        document.querySelectorAll('.newUser').forEach(element => element.classList.add("hidden"));

    } else {
        document.querySelectorAll('.existingUserFound').forEach(element => element.classList.add("hidden"));
        document.querySelectorAll('.newUser').forEach(element => element.classList.remove("hidden"));
        getNewName();
    }
}
init();