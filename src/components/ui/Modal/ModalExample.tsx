import React, { useState } from 'react';
import { Modal } from './Modal';

export const ModalExample: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Modal Kullanım Örnekleri</h2>
      
      <button onClick={() => setIsInfoModalOpen(true)}>
        Bilgi Modalı Aç
      </button>
      
      <button onClick={() => setIsConfirmModalOpen(true)} style={{ marginLeft: '10px' }}>
        Onay Modalı Aç
      </button>
      
      <button onClick={() => setIsCustomModalOpen(true)} style={{ marginLeft: '10px' }}>
        Özel İçerik Modalı Aç
      </button>

      {/* Basit Bilgi Modalı */}
      <Modal 
        open={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)}
        title="Bilgi"
      >
        <p>Bu bir bilgi mesajıdır. Modal componenti artık genel kullanıma uygun!</p>
        <button onClick={() => setIsInfoModalOpen(false)}>Tamam</button>
      </Modal>

      {/* Onay Modalı */}
      <Modal 
        open={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)}
        title="Onay"
      >
        <p>Bu işlemi gerçekleştirmek istediğinizden emin misiniz?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={() => setIsConfirmModalOpen(false)}>İptal</button>
          <button 
            onClick={() => {
              alert('İşlem onaylandı!');
              setIsConfirmModalOpen(false);
            }}
            style={{ backgroundColor: '#007bff', color: 'white' }}
          >
            Onayla
          </button>
        </div>
      </Modal>

      {/* Özel İçerik Modalı */}
      <Modal 
        open={isCustomModalOpen} 
        onClose={() => setIsCustomModalOpen(false)}
        title="Özel İçerik"
      >
        <div style={{ textAlign: 'center' }}>
          <h3>Özel İçerik</h3>
          <p>Bu modal içinde istediğiniz herhangi bir React componenti kullanabilirsiniz.</p>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px',
            margin: '10px 0'
          }}>
            <strong>Özellikler:</strong>
            <ul style={{ textAlign: 'left' }}>
              <li>Formlar</li>
              <li>Listeler</li>
              <li>Grafikler</li>
              <li>Herhangi bir React componenti</li>
            </ul>
          </div>
          <button onClick={() => setIsCustomModalOpen(false)}>Kapat</button>
        </div>
      </Modal>
    </div>
  );
}; 