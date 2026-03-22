import React from 'react';
import { Handle, Position } from 'reactflow';

export default function InputNode({ data }) {
  return (
    <div className="bg-[#111827] border border-emerald-400/30 hover:border-emerald-400 rounded-xl p-4 min-w-[280px] max-w-[340px] shadow-xl transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">✏️</span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Prompt Input
        </span>
      </div>

      {/* Textarea */}
      <textarea
        className="w-full bg-[#0a0f1a] border border-[#1f3a55] focus:border-emerald-400 rounded-lg text-slate-200 text-xs font-mono p-3 resize-none outline-none leading-relaxed placeholder-slate-600 transition-colors duration-150"
        placeholder="Type your question here..."
        value={data.value}
        onChange={(e) => data.onChange && data.onChange(e.target.value)}
        rows={4}
      />

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-[#111827]"
      />
    </div>
  );
}