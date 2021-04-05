import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ list, editing, removeItem }) => {
    return (
        <div>
            {list.map((item) => {
                const { id, prod } = item;
                return (
                    <div className='grocery-item' key={id}>
                        <p className='title'>{prod}</p>
                        <div className='btn-container'>
                            <button
                                className='edit-btn'
                                onClick={() => editing(id)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className='delete-btn'
                                onClick={() => removeItem(id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default List;
