import React, { useState } from 'react';
import './index.css';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
};
const App = () => {
    const [item, setItem] = useState('');
    const [list, setList] = useState(getLocalStorage());
    const [alert, setAlert] = useState({ type: '', msg: '', show: false });
    const [isEditing, setIsEditing] = useState(false);
    React.useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);
    const showAlert = (show = false, msg = '', type = '') => {
        setAlert({ show, msg, type });
    };
    const sortItems = () => {
        setList([...list].sort((a, b) => (a.id < b.id ? 1 : -1)));
    };
    const editing = (id) => {
        setIsEditing(true);
        setList(
            list.filter((item) => {
                return id !== item.id;
            }),
        );
        const newItem = list.find((item) => {
            return id === item.id;
        });
        setItem(newItem.prod);
    };
    const removeItem = (id) => {
        showAlert(true, 'removed item', 'danger');
        setList(list.filter((item) => id !== item.id));
    };
    const clearItems = () => {
        showAlert(true, 'cleared all items', 'danger');
        setList([]);
        setItem('');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item) {
            showAlert(true, 'Plz add Item', 'danger');
            // setIsEditing(false);
        } else if (item && isEditing) {
            showAlert(true, 'Editing Item', 'success');
            // setIsEditing(true);
            const newItem = { id: new Date().getTime().toString(), prod: item };
            const newList = [...list, newItem];
            setList(newList);
            showAlert(true, 'Item added successfully', 'success');
            setItem('');
            setIsEditing(false);
        } else {
            // setIsEditing(false);
            const newItem = { id: new Date().getTime().toString(), prod: item };
            const newList = [...list, newItem];
            setList(newList);
            showAlert(true, 'Item added successfully', 'success');
            setItem('');
        }
    };
    return (
        <main>
            <section className='section-center' type={onsubmit}>
                {alert && (
                    <Alert show={alert} removeAlert={showAlert} list={list} />
                )}
                <form action='listItems' className='grocery-form'>
                    <h3>
                        <i>TODO'S</i>
                    </h3>
                    <div className='form-control'>
                        <input
                            type='text'
                            className='grocery'
                            placeholder='e.g. get Bread from market at 5 P.M'
                            name='item'
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                        />
                        <button className='submit-btn' onClick={handleSubmit}>
                            {isEditing ? 'Edit item' : 'Submit'}
                        </button>
                    </div>
                </form>
                <div className='grocery-container'>
                    <List
                        list={list}
                        editing={editing}
                        removeItem={removeItem}
                    />
                </div>
                <button className='clear-btn' onClick={() => clearItems()}>
                    Clear all
                </button>
                <button className='sort-btn' onClick={() => sortItems()}>
                    Sort items by Time Modified
                </button>
            </section>
        </main>
    );
};

export default App;
