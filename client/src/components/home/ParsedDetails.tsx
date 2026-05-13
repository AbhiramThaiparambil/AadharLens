import type { IParsedResponse } from '../../lib/types/IParsedResponse'

const ParsedDetails = ({ data }: { data: IParsedResponse }) => {
 console.log(data)
  return (

<div className="w-full flex flex-col gap-6">
                  <div className="bg-base p-6 rounded-lg shadow-sm border border-secondary flex flex-col gap-3 w-full text-left">
                    <h3 className="font-bold text-lg border-b border-secondary/50 pb-2 mb-2 text-primary">Parsed Details</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                      <div>
                        <p className="text-[11px] text-primary/60 uppercase tracking-wider font-bold mb-1">Name</p>
                        <p className="text-[15px] font-medium">{data.Name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-primary/60 uppercase tracking-wider font-bold mb-1">DOB</p>
                        <p className="text-[15px] font-medium">{data.DOB || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-primary/60 uppercase tracking-wider font-bold mb-1">Age Band</p>
                        <p className="text-[15px] font-medium">{data.age_band || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-primary/60 uppercase tracking-wider font-bold mb-1">Gender</p>
                        <p className="text-[15px] font-medium">{data.Gender || 'N/A'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[11px] text-primary/60 uppercase tracking-wider font-bold mb-1">Address</p>
                        <p className="text-[15px] font-medium">{data.address || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                
                <div>
                  <h3 className="font-bold text-sm mb-2 text-primary/80 text-left">Raw JSON Response</h3>
                  <pre className="text-left w-full text-primary text-[13px] bg-base p-4 rounded-lg shadow-sm border border-secondary whitespace-pre-wrap">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </div>
)
}

export default ParsedDetails