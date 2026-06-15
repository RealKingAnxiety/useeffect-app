'use client';

import { useState, useEffect, useRef } from 'react';

// Challenge 1: Focus on Mount
function FocusOnMount() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="challenge">
      <h2>1. Focus on Mount</h2>
      <input ref={inputRef} placeholder="I should be focused" />
    </div>
  );
}

// Challenge 2: Focus Conditionally
function FocusConditionally() {
  const [showForm, setShowForm] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm) {
      firstInputRef.current?.focus();
    }
  }, [showForm]);

  return (
    <div className="challenge">
      <h2>2. Focus Field Conditionally</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide' : 'Show'} Form
      </button>
      {showForm && (
        <div>
          <input ref={firstInputRef} placeholder="First name" />
          <input placeholder="Last name" />
        </div>
      )}
    </div>
  );
}

// Challenge 3: Fix Interval
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="challenge">
      <h2>3. Fix Interval Firing</h2>
      <h1>{count}</h1>
    </div>
  );
}

// Challenge 4: Fix Fetching
function BioFetcher() {
  const [person, setPerson] = useState<'Alice' | 'Bob' | 'Taylor'>('Alice');
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);

    fetchBio(person).then(result => {
      if (!ignore) setBio(result);
    });

    return () => { ignore = true; };
  }, [person]);

  return (
    <div className="challenge">
      <h2>4. Fix Fetching</h2>
      <select value={person} onChange={e => setPerson(e.target.value as any)}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <p><i>{bio ?? 'Loading...'}</i></p>
    </div>
  );
}

async function fetchBio(person: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `This is ${person}'s bio.`;
}

// You Might Not Need an Effect Challenges

// Challenge 5: Transform Data without Effects
function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');

  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <div className="challenge">
      <h2>5. Transform Data without Effects</h2>
      <label>
        <input type="checkbox" checked={showActive} onChange={e => setShowActive(e.target.checked)} />
        Show only active todos
      </label>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="New todo" />
      <button onClick={handleAddClick}>Add</button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      <footer>{activeTodos.length} todos left</footer>
    </div>
  );
}

// Placeholder for todos.js
const initialTodos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build a project', completed: false },
  { id: 3, text: 'Deploy to Vercel', completed: false },
];

function createTodo(text: string) {
  return { id: Date.now(), text, completed: false };
}

// Challenge 6-8: Cache Calculation, Reset State, Submit Form (Combined)
function OptimizedTodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');

  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  return (
    <div className="challenge">
      <h2>6-8. Optimized (No Unnecessary Effects)</h2>
      <label>
        <input type="checkbox" checked={showActive} onChange={e => setShowActive(e.target.checked)} />
        Show only active todos
      </label>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="New todo" />
      <button onClick={() => {
        setText('');
        setTodos([...todos, createTodo(text)]);
      }}>Add</button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      <footer>{activeTodos.length} todos left</footer>
    </div>
  );
}

export default function UseEffectChallenges() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16">useEffect Challenges</h1>
        
        <div className="space-y-16">
          <FocusOnMount />
          <FocusConditionally />
          <Counter />
          <BioFetcher />
          <TodoList />
          <OptimizedTodoList />
        </div>
      </div>
    </div>
  );
}