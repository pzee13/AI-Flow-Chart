import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import InputNode from './components/InputNode';
import ResultNode from './components/ResultNode';

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'inputNode',
    position: { x: 80, y: 200 },
    data: { label: 'Input Prompt', value: '' },
  },
  {
    id: '2',
    type: 'resultNode',
    position: { x: 550, y: 200 },
    data: { label: 'AI Response', value: '', status: 'idle' },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: false,
    style: { stroke: '#6ee7b7', strokeWidth: 2 },
  },
];

const BASE_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const getPrompt = () => nodes.find((n) => n.id === '1')?.data?.value || '';
  const getResponse = () => nodes.find((n) => n.id === '2')?.data?.value || '';

  const setResultNode = (value, status) => {
    setNodes((nds) =>
      nds.map((n) => n.id === '2' ? { ...n, data: { ...n.data, value, status } } : n)
    );
    setEdges((eds) =>
      eds.map((e) => e.id === 'e1-2' ? { ...e, animated: status === 'loading' } : e)
    );
  };

  const handleRunFlow = async () => {
    const prompt = getPrompt();
    if (!prompt.trim()) return showToast('Please enter a prompt first.', 'error');
    setLoading(true);
    setResultNode('Thinking...', 'loading');
    try {
      const res = await fetch(`${BASE_URL}/api/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setResultNode(data.answer, 'success');
    } catch (err) {
      setResultNode('Error: ' + err.message, 'error');
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const prompt = getPrompt();
    const response = getResponse();
    if (!prompt.trim()) return showToast('Please enter a prompt first.', 'error');
    if (!response.trim() || response === 'Thinking...')
      return showToast('Run the flow first before saving.', 'error');
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/api/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, response }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast('✅ Saved to MongoDB!');
    } catch (err) {
      showToast('Failed to save: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleShowHistory = async () => {
    setShowHistory(true);
    setHistoryLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/history`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setHistory(data.data);
    } catch (err) {
      showToast('Failed to load history.', 'error');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleClear = () => {
  setNodes((nds) =>
    nds.map((n) => {
      if (n.id === '1') return { ...n, data: { ...n.data, value: '' } };
      if (n.id === '2') return { ...n, data: { ...n.data, value: '', status: 'idle' } };
      return n;
    })
  );
  setEdges((eds) =>
    eds.map((e) => e.id === 'e1-2' ? { ...e, animated: false } : e)
  );
};

  const handlePromptChange = (value) => {
    setNodes((nds) =>
      nds.map((n) => n.id === '1' ? { ...n, data: { ...n.data, value } } : n)
    );
  };

  const handleLoadFlow = (item) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === '1') return { ...n, data: { ...n.data, value: item.prompt } };
        if (n.id === '2') return { ...n, data: { ...n.data, value: item.response, status: 'success' } };
        return n;
      })
    );
    setShowHistory(false);
    showToast('Flow loaded!');
  };

  const nodesWithHandlers = nodes.map((n) =>
    n.id === '1' ? { ...n, data: { ...n.data, onChange: handlePromptChange } } : n
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0a0f1a] overflow-hidden">

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#111827] border-b border-[#1f3a55] z-10 flex-shrink-0">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-2xl bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent tracking-tight">
            ⚡ AI Flow Chat
          </span>
          <span className="text-xs text-slate-500 tracking-wide">
            Powered by OpenRouter
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
  onClick={handleClear}
  className="px-4 py-2 text-sm font-semibold text-red-400 border border-red-400/50 rounded-lg hover:bg-red-400/10 transition-all"
>
  🗑️ Clear
</button>
          <button
            onClick={handleShowHistory}
            className="px-4 py-2 text-sm font-semibold text-slate-400 border border-[#1f3a55] rounded-lg hover:text-white hover:border-sky-400 transition-all"
          >
            📋 History
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-semibold text-violet-400 border border-violet-400 rounded-lg hover:bg-violet-400/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : '💾 Save'}
          </button>
          <button
            onClick={handleRunFlow}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold bg-emerald-300 text-[#0a0f1a] rounded-lg hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border-2 border-[#0a0f1a]/30 border-t-[#0a0f1a] rounded-full animate-spin" />
                Running...
              </>
            ) : (
              '▶ Run Flow'
            )}
          </button>
        </div>
      </header>

      {/* Flow Canvas */}
      <div className="flex-1 bg-[#0a0f1a]">
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-right"
        >
          <Controls className="!bg-[#111827] !border !border-[#1f3a55] !rounded-lg !overflow-hidden" />
          <Background color="#334155" gap={24} size={1.5} />
        </ReactFlow>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg text-sm font-semibold z-50 animate-slide-up
          ${toast.type === 'success'
            ? 'bg-emerald-400/10 border border-emerald-400 text-emerald-400'
            : 'bg-red-400/10 border border-red-400 text-red-400'
          }`}>
          {toast.msg}
        </div>
      )}

      {/* History Panel */}
      {showHistory && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowHistory(false)}
        >
          <div
            className="bg-[#111827] border border-[#1f3a55] rounded-2xl w-[620px] max-w-[95vw] max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#1f3a55] flex-shrink-0">
              <h2 className="text-lg font-bold text-white">📋 Saved Flows</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-white text-lg px-2 py-1 rounded transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Panel List */}
            <div className="overflow-y-auto p-6 flex flex-col gap-4">
              {historyLoading ? (
                <p className="text-center text-slate-500 py-10">Loading...</p>
              ) : history.length === 0 ? (
                <p className="text-center text-slate-500 py-10">No saved flows yet.</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#1e2a3a] border border-[#1f3a55] rounded-xl p-4 flex flex-col gap-3 hover:border-sky-400 transition-colors"
                  >
                    <div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                        🧑 Prompt
                      </span>
                      <p className="text-sm text-emerald-300 leading-relaxed break-words">
                        {item.prompt}
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                        🤖 Response
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed break-words max-h-20 overflow-y-auto">
                        {item.response}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[0.65rem] text-slate-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleLoadFlow(item)}
                        className="text-xs font-semibold px-3 py-1.5 border border-sky-400 text-sky-400 rounded-md hover:bg-sky-400/10 transition-all"
                      >
                        Load →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}