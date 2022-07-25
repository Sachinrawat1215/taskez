import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addCard, updateCard, deleteCard } from '../../Redux/actions/action';

const ContentBox = () => {
   const dispatch = useDispatch();
   const allCardData = useSelector(state => state.cardData);
   const [todoDisplay, settodoDisplay] = useState('none');
   const [inprogressDisplay, setinprogressDisplay] = useState('none');
   const [completedDisplay, setcompletedDisplay] = useState('none');

   const showTodoAdd = () => {
      todoDisplay === 'none' ? settodoDisplay('block') : settodoDisplay('none');
   }

   const showProgressAdd = () => {
      inprogressDisplay === 'none' ? setinprogressDisplay('block') : setinprogressDisplay('none');
   }

   const showCompletedAdd = () => {
      completedDisplay === 'none' ? setcompletedDisplay('block') : setcompletedDisplay('none');
   }

   function CardData(title, description, status) {
      return {
         id: Math.floor(Math.random() * (9999999999999 - 1000000000000) + 1000000000000),
         title: title,
         description: description,
         status: status,
         name: localStorage.getItem('taskez-name'),
         image: localStorage.getItem('taskez-image'),
         email: localStorage.getItem('taskez'),
      }
   }

   const [todoTitle, settodoTitle] = useState('');
   const [todoDescription, settodoDescription] = useState('');

   const addTodo = async () => {
      if (todoTitle === '' || todoDescription === '') {
         alert('Please fill all fields');
      } else {
         dispatch(addCard(CardData(todoTitle, todoDescription, 'todo')));
         settodoTitle('');
         settodoDescription('');
         settodoDisplay('none');
      }
   }

   const [progressTitle, setprogressTitle] = useState('');
   const [progressDescription, setprogressDescription] = useState('');

   const addProgress = async () => {
      if (progressTitle === '' || progressDescription === '') {
         alert('Please fill all fields');
      } else {
         dispatch(addCard(CardData(progressTitle, progressDescription, 'progress')));
         setprogressTitle('');
         setprogressDescription('');
         setinprogressDisplay('none');
      }
   }

   const [completedTitle, setcompletedTitle] = useState('');
   const [completedDescription, setcompletedDescription] = useState('');

   const addCompleted = async () => {
      if (completedTitle === '' || completedDescription === '') {
         alert('Please fill all fields');
      } else {
         dispatch(addCard(CardData(completedTitle, completedDescription, 'completed')));
         setcompletedTitle('');
         setcompletedDescription('');
         setcompletedDisplay('none');
      }
   }

   const [cards, setcards] = useState([]);
   const [todoBorder, settodoBorder] = useState('white');
   const [progressBorder, setprogressBorder] = useState('white');
   const [completedBorder, setcompletedBorder] = useState('white');
   const [showDetailedCard, setshowDetailedCard] = useState(false);

   useEffect(() => {
      const getCards = async () => {
         const cards = allCardData;
         setcards(cards);
      }
      getCards();
   }, [todoBorder, progressBorder, completedBorder, showDetailedCard, todoDisplay, inprogressDisplay, completedDisplay]);

   let todocard = cards && cards.filter(card => card.status === 'todo').length;
   let inprogresscard = cards && cards.filter(card => card.status === 'progress').length;
   let completedcard = cards && cards.filter(card => card.status === 'completed').length;


   // Drag and Drop Code

   const todoDragStart = (e, id) => {
      e.dataTransfer.setData('cardId', id);
   }

   const progressDragStart = (e, id) => {
      e.dataTransfer.setData('cardId', id);
   }

   const completedDragStart = (e, id) => {
      e.dataTransfer.setData('cardId', id);
   }

   const todoDragOver = (e) => {
      e.preventDefault();
      settodoBorder('gray');
   }

   const progressDragOver = (e) => {
      e.preventDefault();
      setprogressBorder('gray');
   }

   const completedDragOver = (e) => {
      e.preventDefault();
      setcompletedBorder('gray');
   }

   const todoDragDropped = async (e) => {
      const cardId = e.dataTransfer.getData('cardId');
      dispatch(updateCard({id: cardId, status: 'todo' }));
      settodoBorder('white');
   }

   const progressDragDropped = async (e) => {
      const cardId = e.dataTransfer.getData('cardId');
      dispatch(updateCard({id: cardId, status: 'progress' }));
      setprogressBorder('white');
   }

   const completedDragDropped = async (e) => {
      const cardId = e.dataTransfer.getData('cardId');
      dispatch(updateCard({id: cardId, status: 'completed' }));
      setcompletedBorder('white');
   }

   // Handling detailed card
   const [rightVal, setrightVal] = useState('');
   const [cardData, setcardData] = useState([]);

   const showBigCard = (value, id) => {
      const res = allCardData.filter(card => card.id === id);

      window.scrollTo(0, 0);
      setcardData(res[0]);
      setshowDetailedCard(value);
   }

   const hideDetailedCard = () => {
      setrightVal('-532px');
      setshowDetailedCard(false);
   }

   const handleDelete = async (id) => {
      const confirm = window.confirm('Are you sure you want to delete this card?');
      console.log(confirm);
      if (confirm) {
         const res = allCardData.filter(card => card.id === id);
         dispatch(deleteCard(res[0]));
         hideDetailedCard();
      }else{
         return;
      }
   }

   useEffect(() => {
      if (showDetailedCard) {
         setrightVal('0px');
      } else {
         setrightVal('-532px');
      }
   }, [showDetailedCard]);

   return (
      <div className='content-box'>
         {/* To Do Tray */}
         <div dropabble="true" onDragOver={todoDragOver} onDrop={todoDragDropped} onDragLeave={() => settodoBorder('white')} style={{ border: `2px dashed ${todoBorder}` }} className="content-tray">
            <div className='top'>
               <h3>To Do</h3>
               <p className="todo-count">{todocard}</p>
            </div>
            <div onClick={showTodoAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{ display: todoDisplay, transition: "0.6s ease" }} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' value={todoTitle} onChange={(e) => settodoTitle(e.target.value)} />
               <textarea name="description" id="description" placeholder='Description' value={todoDescription} onChange={(e) => settodoDescription(e.target.value)}></textarea>
               <button onClick={addTodo}>Add</button>
            </div>
            {cards && cards.map((card, index) => {
               if (card.status === 'todo') {
                  todocard++;
                  return (<div draggable="true" onDragStart={(e) => todoDragStart(e, card.id)} key={index} className="content-card" onClick={() => showBigCard(true, card.id)}>
                     <h3>{card.title}</h3>
                     <p>{card.description}</p>
                     <div className="card-writer">
                        <div>
                           <img src={card.image} alt="" />
                           <p>{card.name}</p>
                        </div>
                        <i className="far fa-comment-alt-dots"></i>
                     </div>
                  </div>)
               }
            })}
         </div>

         {/* In Progress Tray */}
         <div dropabble="true" onDragOver={progressDragOver} onDrop={progressDragDropped} onDragLeave={() => setprogressBorder('white')} style={{ border: `2px dashed ${progressBorder}` }} className="content-tray">
            <div className='top'>
               <h3>In Progress</h3>
               <p className="todo-count">{inprogresscard}</p>
            </div>
            <div onClick={showProgressAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{ display: inprogressDisplay, transition: "0.6s ease" }} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' value={progressTitle} onChange={(e) => setprogressTitle(e.target.value)} />
               <textarea name="description" id="description" placeholder='Description' value={progressDescription} onChange={(e) => setprogressDescription(e.target.value)}></textarea>
               <button onClick={addProgress}>Add</button>
            </div>
            {cards && cards.map((card, index) => {
               if (card.status === 'progress') {
                  return (<div draggable="true" onDragStart={(e) => progressDragStart(e, card.id)} key={index} className="content-card" onClick={() => showBigCard(true, card.id)}>
                     <h3>{card.title}</h3>
                     <p>{card.description}</p>
                     <div className="card-writer">
                        <div>
                           <img src={card.image} alt="" />
                           <p>{card.name}</p>
                        </div>
                        <i className="far fa-comment-alt-dots"></i>
                     </div>
                  </div>)
               }
            })}
         </div>

         {/* Completed Tray */}
         <div dropabble="true" onDragOver={completedDragOver} onDrop={completedDragDropped} onDragLeave={() => setcompletedBorder('white')} style={{ border: `2px dashed ${completedBorder}` }} className="content-tray">
            <div className='top'>
               <h3>Completed</h3>
               <p className="todo-count">{completedcard}</p>
            </div>
            <div onClick={showCompletedAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{ display: completedDisplay, transition: "0.6s ease" }} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' value={completedTitle} onChange={(e) => setcompletedTitle(e.target.value)} />
               <textarea name="description" id="description" placeholder='Description' value={completedDescription} onChange={(e) => setcompletedDescription(e.target.value)}></textarea>
               <button onClick={addCompleted}>Add</button>
            </div>
            {cards && cards.map((card, index) => {
               if (card.status === 'completed') {
                  return (<div draggable="true" onDragStart={(e) => completedDragStart(e, card.id)} key={index} className="content-card" onClick={() => showBigCard(true, card.id)}>
                     <h3>{card.title}</h3>
                     <p>{card.description}</p>
                     <div className="card-writer">
                        <div>
                           <img src={card.image} alt="" />
                           <p>{card.name}</p>
                        </div>
                        <i className="far fa-comment-alt-dots"></i>
                     </div>
                  </div>)
               }
            })}
         </div>

         <div style={{ right: rightVal }} className='card-content-container'>
            <div className='icons'>
               <i onClick={() => handleDelete(cardData.id)} style={{display: cardData.email === localStorage.getItem('taskez') ? 'inline' : 'none'}} className="far fa-trash-alt"></i>
               <i onClick={hideDetailedCard} className="far fa-times"></i>
            </div>
            <h1>{cardData.title}</h1>
            <div className="card-content">
               <div className="detail">
                  <p>Created By</p>
                  <div className="content">
                     <img src={cardData.image} alt="" />
                     <p>{cardData.name}</p>
                  </div>
               </div>
               <div className="detail">
                  <p>Description</p>
                  <div className="content">
                     <p>{cardData.description}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContentBox;