import { useState, useEffect, useRef, useCallback } from 'react'
import { Plus, Pencil, Trash, Eye } from '@phosphor-icons/react'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [trainings, setTrainings] = useState([])
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [modalType, setModalType] = useState('product')
  const [formData, setFormData] = useState({ 
    name: '', description: '', price: '', category: '', brand: '', image: '', stock: '',
    title: '', duration: '', students: '', modules: '', color: '',
    eventTitle: '', eventDate: '', eventTime: '', eventLocation: '', eventPlaces: '', eventStatus: '', eventImage: '', eventAccent: ''
  })

  const categories = ['sacs', 'pagnes', 'chaussures', 'vetements', 'tissus', 'accessoires']
  const brands = ['afisac', 'afi-pagne', 'afi-chaussure', 'afi-vetement', 'afi-tissu', 'afi-mode']
  const colors = ['#008753', '#FCD116', '#E8112D']
  const statuses = ['à venir', 'complet', 'passé', 'récent']
  const modalRef = useRef(null)

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token')
    try {
      const [statsRes, productsRes, trainingsRes, eventsRes, usersRes, messagesRes] = await Promise.all([
        fetch('/api/admin/stats',     { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/products',  { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/trainings', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/events',    { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/users',     { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/messages',  { headers: { Authorization: `Bearer ${token}` } })
      ])
      const safeJson = async (res) => { try { return await res.json() } catch { return [] } }
      setStats(await safeJson(statsRes))
      setProducts(await safeJson(productsRes))
      setTrainings(await safeJson(trainingsRes))
      setEvents(await safeJson(eventsRes))
      setUsers(await safeJson(usersRes))
      setMessages(await safeJson(messagesRes))
    } catch (err) {
      console.error('Erreur fetchData:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Premier chargement
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { window.location.href = '/connexion'; return }
    fetchData()
  }, [fetchData])

  // Recharge quand on arrive sur l'onglet users
  useEffect(() => {
    if (activeTab === 'users') fetchData()
  }, [activeTab, fetchData])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false)
        setEditingItem(null)
      }
    }
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [showModal])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (modalType === 'product') {
      const url = editingItem ? `/api/admin/products/${editingItem.id}` : '/api/admin/products'
      const method = editingItem ? 'PUT' : 'POST'
      const body = { name: formData.name, description: formData.description, price: parseInt(formData.price), category: formData.category, brand: formData.brand, image: formData.image, stock: parseInt(formData.stock) }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) })
      if (res.ok) { setShowModal(false); setEditingItem(null); resetForm(); fetchData() }
    } else if (modalType === 'training') {
      const url = editingItem ? `/api/admin/trainings/${editingItem.id}` : '/api/admin/trainings'
      const method = editingItem ? 'PUT' : 'POST'
      const modulesArray = formData.modules.split(',').map(m => m.trim())
      const body = { title: formData.title, description: formData.description, duration: formData.duration, price: formData.price, modules: modulesArray, students: parseInt(formData.students), image: formData.image, color: formData.color }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) })
      if (res.ok) { setShowModal(false); setEditingItem(null); resetForm(); fetchData() }
    } else if (modalType === 'event') {
      const url = editingItem ? `/api/admin/events/${editingItem.id}` : '/api/admin/events'
      const method = editingItem ? 'PUT' : 'POST'
      const body = { title: formData.eventTitle, description: formData.description, date: formData.eventDate, time: formData.eventTime, location: formData.eventLocation, places: parseInt(formData.eventPlaces), status: formData.eventStatus, image: formData.eventImage, accent: formData.eventAccent }
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) })
      if (res.ok) { setShowModal(false); setEditingItem(null); resetForm(); fetchData() }
    }
  }

  const handleDelete = async (item, type) => {
    if (!confirm(`Supprimer "${item.name || item.title}" ?`)) return
    const token = localStorage.getItem('token')
    let url = ''
    if (type === 'product') url = `/api/admin/products/${item.id}`
    else if (type === 'training') url = `/api/admin/trainings/${item.id}`
    else if (type === 'event') url = `/api/admin/events/${item.id}`
    else if (type === 'user') url = `/api/admin/users/${item.id}`
    else url = `/api/admin/messages/${item.id}`
    await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchData()
  }

  const markMessageAsRead = async (id) => {
    const token = localStorage.getItem('token')
    await fetch(`/api/admin/messages/${id}/read`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } })
    fetchData()
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', brand: '', image: '', stock: '', title: '', duration: '', students: '', modules: '', color: '', eventTitle: '', eventDate: '', eventTime: '', eventLocation: '', eventPlaces: '', eventStatus: '', eventImage: '', eventAccent: '' })
  }

  const openProductModal = (item = null) => {
    setModalType('product'); setEditingItem(item)
    if (item) { setFormData({ ...formData, name: item.name, description: item.description, price: item.price.toString(), category: item.category, brand: item.brand, image: item.image, stock: item.stock.toString() }) } else { resetForm() }
    setShowModal(true)
  }

  const openTrainingModal = (item = null) => {
    setModalType('training'); setEditingItem(item)
    if (item) { setFormData({ ...formData, title: item.title, description: item.description, duration: item.duration, price: item.price, students: item.students.toString(), modules: item.modules.join(', '), image: item.image, color: item.color }) } else { resetForm() }
    setShowModal(true)
  }

  const openEventModal = (item = null) => {
    setModalType('event'); setEditingItem(item)
    if (item) { setFormData({ ...formData, eventTitle: item.title, description: item.description, eventDate: item.date, eventTime: item.time, eventLocation: item.location, eventPlaces: item.places.toString(), eventStatus: item.status, eventImage: item.image, eventAccent: item.accent }) } else { resetForm() }
    setShowModal(true)
  }

  const viewMessage = (message) => {
    setSelectedMessage(message); setShowMessageModal(true)
    if (!message.read) markMessageAsRead(message.id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-[#008753] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const renderTable = (data, type, columns) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map(col => <th key={col.key} className="px-4 py-3 text-left">{col.label}</th>)}
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3 dark:text-white">
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              <td className="px-4 py-3 text-center">
                {type === 'message' ? (
                  <button onClick={() => viewMessage(item)} className="p-1 text-blue-500 mx-1">
                    <Eye size={16} />
                  </button>
                ) : type === 'user' ? (
                  <button onClick={() => handleDelete(item, type)} className="p-1 text-red-500 mx-1">
                    <Trash size={16} />
                  </button>
                ) : (
                  <>
                    <button onClick={() => type === 'product' ? openProductModal(item) : type === 'training' ? openTrainingModal(item) : openEventModal(item)} className="p-1 text-yellow-500 mx-1">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item, type)} className="p-1 text-red-500 mx-1">
                      <Trash size={16} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          {['dashboard', 'products', 'trainings', 'events', 'users', 'messages'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === tab ? 'bg-[#008753] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
              {tab === 'dashboard' ? 'Dashboard' : tab === 'products' ? 'Produits' : tab === 'trainings' ? 'Formations' : tab === 'events' ? 'Événements' : tab === 'users' ? 'Utilisateurs' : 'Messages'}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-2xl font-bold text-[#008753]">{stats.users}</div><div className="text-sm text-gray-500">Utilisateurs</div></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-2xl font-bold text-[#FCD116]">{stats.products}</div><div className="text-sm text-gray-500">Produits</div></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-2xl font-bold text-[#E8112D]">{stats.trainings}</div><div className="text-sm text-gray-500">Formations</div></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-2xl font-bold text-[#008753]">{stats.events}</div><div className="text-sm text-gray-500">Événements</div></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-2xl font-bold text-[#FCD116]">{stats.messages}</div><div className="text-sm text-gray-500">Messages</div></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-2xl font-bold text-[#E8112D]">{stats.orders}</div><div className="text-sm text-gray-500">Commandes</div></div>
          </div>
        )}

        {/* Produits */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">Gestion des produits</h2>
              <button onClick={() => openProductModal()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#008753] text-white text-sm font-semibold hover:scale-105 transition">
                <Plus size={16} /> Ajouter
              </button>
            </div>
            {renderTable(products, 'product', [
              { key: 'name', label: 'Nom' },
              { key: 'price', label: 'Prix', render: (val) => `${val.toLocaleString()} FCFA` },
              { key: 'category', label: 'Catégorie' },
              { key: 'stock', label: 'Stock' }
            ])}
          </div>
        )}

        {/* Formations */}
        {activeTab === 'trainings' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">Gestion des formations</h2>
              <button onClick={() => openTrainingModal()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#008753] text-white text-sm font-semibold hover:scale-105 transition">
                <Plus size={16} /> Ajouter
              </button>
            </div>
            {renderTable(trainings, 'training', [
              { key: 'title', label: 'Titre' },
              { key: 'price', label: 'Prix' },
              { key: 'duration', label: 'Durée' },
              { key: 'students', label: 'Apprenants' }
            ])}
          </div>
        )}

        {/* Événements */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">Gestion des événements</h2>
              <button onClick={() => openEventModal()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#008753] text-white text-sm font-semibold hover:scale-105 transition">
                <Plus size={16} /> Ajouter
              </button>
            </div>
            {renderTable(events, 'event', [
              { key: 'title', label: 'Titre' },
              { key: 'date', label: 'Date' },
              { key: 'location', label: 'Lieu' },
              { key: 'status', label: 'Statut', render: (val) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${val === 'à venir' ? 'bg-green-100 text-green-700' : val === 'complet' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{val}</span>
              )}
            ])}
          </div>
        )}

        {/* Utilisateurs */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">Gestion des utilisateurs</h2>
              <button onClick={fetchData} className="px-3 py-1.5 bg-[#008753] text-white rounded-lg text-sm hover:bg-[#006b42] transition">
                ↻ Rafraîchir
              </button>
            </div>
            {renderTable(users, 'user', [
              { key: 'name', label: 'Nom' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Rôle', render: (val) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${val === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{val}</span>
              )},
              { key: 'createdAt', label: 'Inscrit le', render: (val) => new Date(val).toLocaleDateString() }
            ])}
          </div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">Messages de contact</h2>
            </div>
            {renderTable(messages, 'message', [
              { key: 'name', label: 'Nom' },
              { key: 'email', label: 'Email' },
              { key: 'message', label: 'Message', render: (val) => val.substring(0, 50) + (val.length > 50 ? '...' : '') },
              { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleString() },
              { key: 'read', label: 'Lu', render: (val) => val ? '✅' : '⭕' }
            ])}
          </div>
        )}

        {/* Modal message */}
        {showMessageModal && selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl">
              <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-bold dark:text-white">Message de {selectedMessage.name}</h3>
                <button onClick={() => setShowMessageModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-xl leading-none">&times;</button>
              </div>
              <div className="p-4 space-y-3">
                <div><strong>Nom:</strong> {selectedMessage.name}</div>
                <div><strong>Email:</strong> {selectedMessage.email}</div>
                {selectedMessage.phone && <div><strong>Téléphone:</strong> {selectedMessage.phone}</div>}
                {selectedMessage.subject && <div><strong>Sujet:</strong> {selectedMessage.subject}</div>}
                {selectedMessage.subBrand && <div><strong>Collection:</strong> {selectedMessage.subBrand}</div>}
                <div><strong>Message:</strong></div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg max-h-64 overflow-y-auto whitespace-pre-wrap">{selectedMessage.message}</div>
                <div className="text-xs text-gray-500">Reçu le {new Date(selectedMessage.createdAt).toLocaleString()}</div>
                <div className="pt-3 flex gap-3">
                  <a href={`mailto:${selectedMessage.email}`} className="flex-1 py-2 text-center rounded-lg bg-[#008753] text-white font-semibold hover:bg-[#006b42] transition">Répondre</a>
                  <button onClick={() => setShowMessageModal(false)} className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Fermer</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal CRUD */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl flex justify-between items-center p-3 border-b dark:border-gray-700">
                <h3 className="text-md font-bold dark:text-white">
                  {editingItem ? 'Modifier' : 'Ajouter'} {modalType === 'product' ? 'un produit' : modalType === 'training' ? 'une formation' : 'un événement'}
                </h3>
                <button onClick={() => { setShowModal(false); setEditingItem(null) }} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-xl leading-none">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                {modalType === 'product' && (
                  <>
                    <input type="text" placeholder="Nom" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white resize-none" required />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" placeholder="Prix" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                      <input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required>
                        <option value="">Catégorie</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required>
                        <option value="">Marque</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                  </>
                )}
                {modalType === 'training' && (
                  <>
                    <input type="text" placeholder="Titre" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white resize-none" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Durée (ex: 1,5 - 3 mois)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                      <input type="text" placeholder="Prix" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" placeholder="Apprenants" value={formData.students} onChange={e => setFormData({...formData, students: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                      <select value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white">
                        <option value="">Couleur</option>{colors.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <textarea placeholder="Modules (séparés par des virgules)" value={formData.modules} onChange={e => setFormData({...formData, modules: e.target.value})} rows="2" className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                    <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                  </>
                )}
                {modalType === 'event' && (
                  <>
                    <input type="text" placeholder="Titre" value={formData.eventTitle} onChange={e => setFormData({...formData, eventTitle: e.target.value})} className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white resize-none" required />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Date (ex: 15 Juin 2026)" value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                      <input type="text" placeholder="Heure (ex: 10h00 – 13h00)" value={formData.eventTime} onChange={e => setFormData({...formData, eventTime: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Lieu" value={formData.eventLocation} onChange={e => setFormData({...formData, eventLocation: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                      <input type="number" placeholder="Places disponibles" value={formData.eventPlaces} onChange={e => setFormData({...formData, eventPlaces: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select value={formData.eventStatus} onChange={e => setFormData({...formData, eventStatus: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" required>
                        <option value="">Statut</option>{statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={formData.eventAccent} onChange={e => setFormData({...formData, eventAccent: e.target.value})} className="px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white">
                        <option value="">Couleur</option>{colors.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <input type="text" placeholder="Image URL" value={formData.eventImage} onChange={e => setFormData({...formData, eventImage: e.target.value})} className="w-full px-3 py-2 text-sm rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white" />
                  </>
                )}
                <button type="submit" className="w-full py-2 rounded-xl font-semibold text-white text-sm bg-[#008753] hover:bg-[#006b42] transition mt-2">
                  {editingItem ? 'Modifier' : 'Ajouter'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
