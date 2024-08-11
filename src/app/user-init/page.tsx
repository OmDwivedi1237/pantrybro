'use client';

import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: '#1c1c1c',
  border: '2px solid #5a00a1',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  borderRadius: '8px',
};

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonStyle = {
  backgroundColor: '#5a00a1',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor: '#8a2be2',
};

const iconButtonStyle = {
  backgroundColor: '#5a00a1',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const iconHoverStyle = {
  backgroundColor: '#8a2be2',
};

export default function Home() {
  const [inventory, setInventory] = useState<{ name: string; quantity: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [user, setUser] = useState<any>(null);

  const auth = getAuth(); // Initialize Firebase Authentication

  const updateInventory = async () => {
    if (user) {
      const snapshot = query(collection(firestore, 'inventory'));
      const docs = await getDocs(snapshot);
      const inventoryList = [];
      docs.forEach((doc) => {
        const data = doc.data() as { quantity: number };
        inventoryList.push({ name: doc.id, ...data });
      });
      setInventory(inventoryList);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        updateInventory();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const addItem = async (item: string) => {
    if (user) {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data() as { quantity: number };
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      await updateInventory();
    }
  };

  const removeItem = async (item: string) => {
    if (user) {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data() as { quantity: number };
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      await updateInventory();
    }
  };

  const deleteItem = async (item: string) => {
    if (user) {
      const docRef = doc(collection(firestore, 'inventory'), item);
      await deleteDoc(docRef);
      await updateInventory();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#121212', color: '#fff', padding: '16px' }}>
      {user ? (
        <>
          {open && (
            <div style={modalBackdropStyle}>
              <div style={modalStyle}>
                <h6 style={{ color: '#e1bee7' }}>Add Item</h6>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <input
                    type="text"
                    placeholder="Item"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #5a00a1', backgroundColor: '#1c1c1c', color: '#fff' }}
                  />
                  <button
                    style={buttonStyle}
                    onClick={() => {
                      addItem(itemName);
                      setItemName('');
                      handleClose();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            style={{ ...buttonStyle, marginBottom: '16px' }} // Push the button up
            onClick={handleOpen}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Add New Item
          </button>
          <div style={{ border: '1px solid #5a00a1', width: '800px', padding: '16px', borderRadius: '8px' }}>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#2c2c2c', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px' }}>
              <h2 style={{ color: '#e1bee7', textAlign: 'center' }}>Inventory Items</h2>
            </div>
            <div style={{ width: '100%', height: '300px', overflow: 'auto', padding: '16px' }}>
              {inventory.map(({ name, quantity }) => (
                <div
                  key={name}
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#1c1c1c',
                    padding: '16px',
                    marginBottom: '8px',
                    borderRadius: '8px',
                    border: '1px solid #5a00a1',
                  }}
                >
                  <h3 style={{ color: '#e1bee7', textAlign: 'center' }}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      style={iconButtonStyle}
                      onClick={() => addItem(name)}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = iconHoverStyle.backgroundColor}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = iconButtonStyle.backgroundColor}
                    >
                      +
                    </button>
                    <span style={{ color: '#e1bee7' }}>Quantity: {quantity}</span>
                    <button
                      style={iconButtonStyle}
                      onClick={() => removeItem(name)}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = iconHoverStyle.backgroundColor}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = iconButtonStyle.backgroundColor}
                    >
                      -
                    </button>
                    <button
                      style={buttonStyle}
                      onClick={() => deleteItem(name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ color: '#e1bee7' }}>
          <h2>Please sign in to access the inventory.</h2>
        </div>
      )}
    </div>
  );
}
