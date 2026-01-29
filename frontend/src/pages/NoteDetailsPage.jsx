import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import axios from "axios";

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();
  
  useEffect(() => {
    const fetchNote = async() =>{
      try {
        const res = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNote(res.data.note);
      } catch (error) {
        console.log('error',error);
        toast.error('Failed to get note');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  },[id]);

  console.log(note);

  const handleDelete = async() => {
    if(!window.confirm('sure you wanna delete')) return;
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      toast.success('Deleted');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Failed');
    }
  };

    const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
   setSaving(true);
   try {
    await axios.put(`http://localhost:3000/api/notes/${id}`, note);
    toast.success('yay updated');
    navigate('/');
   } catch (error) {
    console.log(error);
    toast.error('error');
   } finally {
    setSaving(false);
   }
  }

if (loading || !note) return (<div className="text-6xl">Loading...</div>);


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
                  <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-start">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
              </div>
            </div>
            </div>
      </div>
    </div>
  )
}



export default NoteDetailsPage;

