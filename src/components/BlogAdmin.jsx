import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Footer from './Footer';
import { isAuthorizedAdmin } from '../utils/adminAccess';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Insights',
  status: 'draft',
  keywords: '',
  meta_description: '',
  featured_image: '',
  schema_type: 'Article'
};

export default function BlogAdmin() {
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/portal');
        return;
      }

      const isAdmin = await isAuthorizedAdmin(session.user.email);

      if (!isAdmin) {
        navigate('/portal');
        return;
      }

      setSessionUser(session.user);
      setAuthorized(true);
      await fetchPosts();
      setLoading(false);
    };

    load();
  }, [navigate]);

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      status: form.status,
      keywords: form.keywords,
      meta_description: form.meta_description,
      featured_image: form.featured_image,
      schema_type: form.schema_type,
      updated_at: new Date().toISOString()
    };

    if (editingId) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', editingId);
      if (error) {
        setMessage({ type: 'error', text: error.message });
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from('blog_posts').insert([{ ...payload, created_at: new Date().toISOString() }]);
      if (error) {
        setMessage({ type: 'error', text: error.message });
        setSaving(false);
        return;
      }
    }

    setForm(emptyForm);
    setEditingId(null);
    setMessage({ type: 'success', text: editingId ? 'Article updated.' : 'Article published.' });
    await fetchPosts();
    setSaving(false);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Insights',
      status: post.status || 'draft',
      keywords: post.keywords || '',
      meta_description: post.meta_description || '',
      featured_image: post.featured_image || '',
      schema_type: post.schema_type || 'Article'
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) {
      setMessage({ type: 'success', text: 'Article deleted.' });
      await fetchPosts();
    }
  };

  const contentWordCount = useMemo(() => {
    const words = (form.content || '').trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [form.content]);

  if (loading) return <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">Loading admin workspace…</div>;
  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-2">Blog Control Center</p>
            <h1 className="text-3xl md:text-4xl font-black">Create, manage, and publish content fast</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">A streamlined workspace for editorial publishing, SEO metadata, and article management built for growth.</p>
          </div>
          <Link to="/portal" className="text-sm text-gray-400 hover:text-white">← Back to portal</Link>
        </div>

        {message.text ? <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${message.type === 'error' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200'}`}>{message.text}</div> : null}

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.8fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="text-sm text-gray-400 mb-2 block">Title</label>
                <input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
              </div>
              <div>
                <label htmlFor="slug" className="text-sm text-gray-400 mb-2 block">Slug</label>
                <input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
              </div>
            </div>
            <div>
              <label htmlFor="excerpt" className="text-sm text-gray-400 mb-2 block">Excerpt</label>
              <textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows="3" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
            </div>
            <div>
              <label htmlFor="content" className="text-sm text-gray-400 mb-2 block">Content</label>
              <textarea id="content" required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows="10" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
              <p className="text-xs text-gray-500 mt-2">Approx. {contentWordCount} words</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="text-sm text-gray-400 mb-2 block">Category</label>
                <input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
              </div>
              <div>
                <label htmlFor="status" className="text-sm text-gray-400 mb-2 block">Status</label>
                <select id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="keywords" className="text-sm text-gray-400 mb-2 block">Keywords</label>
                <input id="keywords" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
              </div>
              <div>
                <label htmlFor="featured_image" className="text-sm text-gray-400 mb-2 block">Featured Image</label>
                <input id="featured_image" value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
              </div>
            </div>
            <div>
              <label htmlFor="meta_description" className="text-sm text-gray-400 mb-2 block">Meta Description</label>
              <textarea id="meta_description" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows="3" className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3" />
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={saving} className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-black">{saving ? 'Publishing…' : editingId ? 'Update Article' : 'Publish Article'}</button>
              {editingId ? <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-full border border-white/10 px-5 py-3">Cancel</button> : null}
            </div>
          </form>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h2 className="text-xl font-semibold mb-4">Content library</h2>
              <div className="space-y-3">
                {posts.length === 0 ? <p className="text-gray-400 text-sm">No articles yet.</p> : posts.map((post) => (
                  <div key={post.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{post.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{post.status} • {post.category}</p>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">{post.slug}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => handleEdit(post)} className="rounded-full border border-white/10 px-3 py-1 text-sm">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="rounded-full border border-red-500/30 px-3 py-1 text-sm text-red-300">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
