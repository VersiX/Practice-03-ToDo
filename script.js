// React Todo




//-------------Button-------------
const ControlButton = (props) => {
    let symbol = "?";
    if (props.type === "del") {
        symbol = "✖";
    }
    if (props.type === "edit") {
        symbol = "✍";
    }
    if (props.type === "do") {
        symbol = "✅";
    }
    if (props.type === "undo") {
        symbol = "♻";
    }
    return (
        <div className="button" onClick={props.action}>
            {symbol}
        </div>
    );
};



const AddItemButton = (props) => {
    return (<div className="add-button" onClick={props.action}>
        ➕ Add new task
    </div>);
}




//-------------List Item-------------

const ListItem = (props) => {
    // state
    const [editor, setEditor] = React.useState(false);
    const [text, setText] = React.useState(props.text);
    // action
    function actionToggleEditor() {
        setEditor(!editor);
    }
    function actionChange(event) {
        setText(event.target.value);
    }
    function actionSaveEditing() {
        setEditor(false);
    }
    function actionCancelEditing() {
        setEditor(false);
        setText(props.text);
    }
    function actionDelete() {
        props.delAction(props.id);
    }
    function actionToggle() {
        props.doneAction(props.id);
    }

    if (props.added) {
        setEditor(true);
    }

    //-------------Element-------------

    return (
        <React.Fragment>
            {!editor && (
                <div className={props.done ? "item item--done" : "item"}>
                    {!props.done && <ControlButton type="do" action={actionToggle} />}
                    {props.done && <ControlButton type="undo" action={actionToggle} />}

                    <div className="item__text">{text}</div>

                    {!props.done && (
                        <ControlButton
                            type="edit"
                            action={actionToggleEditor}
                        />
                    )}
                    <ControlButton type="del" action={actionDelete} />
                </div>
            )}
            {editor && (
                <div className={props.done ? "item item--done" : "item"}>
                    <input
                        type="text"
                        className="item__input"
                        value={text}
                        onChange={actionChange}
                    />
                    <ControlButton type="do" action={actionSaveEditing} />
                    <ControlButton type="del" action={actionCancelEditing} />
                </div>
            )}
        </React.Fragment>
    );
};




//-------------List-------------

const List = (props) => {
    const [tasks, setTasks] = React.useState(props.tasks);
    let doneList = [];
    let undoneList = [];
    tasks.forEach((element, index) => {
        element.key = index;
        if (element.done) {
            doneList.push(element);
        } else {
            undoneList.push(element);
        }
    });
    function actionDeleteTask(key) {
        let newList = [];
        tasks.forEach((element) => {
            if (element.key !== key) {
                newList.push(element);
            }
        });
        setTasks(newList);
    }
    function toggleDone(key) {
        let newList = [];
        tasks.forEach((element) => {
            newList.push(element);
        });
        newList[key].done = !(newList[key].done);
        setTasks(newList);
    }

    function AddItem(params) {
        let newList = [];
        newList.push({
            text: "Нове завдання",
            done: false,
        });
        tasks.forEach((element) => {
            newList.push(element);
        });
        setTasks(newList);
    }



    //-------------Element-------------
    console.log(tasks);
    console.log(undoneList);
    console.log(doneList);

    return (
        <div className="list">
            {tasks.length === 0 && (
                <React.Fragment>
                    <AddItemButton action={AddItem} />
                    <div className="list__section">Nothing to do...</div>
                </React.Fragment>

            )}
            {tasks.length !== 0 && (
                <React.Fragment>
                    <AddItemButton action={AddItem} />
                    {undoneList.length !== 0 && (
                        <div className="list__section">To do:</div>
                    )}
                    {undoneList.map((element) => (
                        <ListItem
                            text={element.text}
                            done={element.done}
                            key={element.key}
                            delAction={actionDeleteTask}
                            doneAction={toggleDone}
                            id={element.key}
                        />
                    ))}
                    {doneList.length !== 0 && (
                        <div className="list__section">Done:</div>
                    )}
                    {doneList.map((element) => (
                        <ListItem
                            text={element.text}
                            done={element.done}
                            key={element.key}
                            delAction={actionDeleteTask}
                            doneAction={toggleDone}
                            id={element.key}
                        />
                    ))}
                </React.Fragment>
            )}
        </div>
    );
};






















let my_tasks = [
    {
        text: "Навчитися змінювати стейт всередині Item",
        done: false,
    },
    {
        text: "Редагувати текст",
        done: false,
    },
    {
        text:
            "Перевіряти чи є щось в списку done і не показувати заголовок якщо пусто",
        done: true,
    },
    {
        text:
            "Перевіряти чи є щось в списку undone і не показувати заголовок якщо пусто",
        done: true,
    },
    { text: "Показувати списки", done: true },
];

const Page = () => {
    return (
        <div>
            <List tasks={my_tasks} />

        </div>
    );
};

// Render

ReactDOM.render(<Page />, document.getElementById("root"));
