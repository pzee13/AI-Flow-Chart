import React from 'react';
import { Handle, Position } from 'reactflow';

export default function ResultNode({ data }) {
  const borderClass =
    data.status === 'loading' ? 'border-sky-400 shadow-sky-400/20 shadow-lg' :
    data.status === 'error'   ? 'border-red-400' :
    data.status === 'success' ? 'border-emerald-400' :
                                'border-violet-400/30 hover:border-violet-400';

  return (
    <div className={`bg-[#111827] border rounded-xl p-4 min-w-[280px] max-w-[340px] shadow-xl transition-all duration-200 ${borderClass}`}>
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-[#111827]"
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🤖</span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex-1">
          AI Response
        </span>
        {data.status === 'loading' && (
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        )}
      </div>

      {/* Result */}
      <div className="bg-[#0a0f1a] border border-[#1f3a55] rounded-lg p-3 text-xs font-mono leading-relaxed min-h-[90px] max-h-[220px] overflow-y-auto whitespace-pre-wrap break-words text-slate-200">
        {data.value ? (
          data.value
        ) : (
          <span className="text-slate-600 italic">Response will appear here...</span>
        )}
      </div>
    </div>
  );
}