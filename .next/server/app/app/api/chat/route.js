"use strict";(()=>{var e={};e.id=736,e.ids=[736],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8459:(e,o,t)=>{t.r(o),t.d(o,{originalPathname:()=>x,patchFetch:()=>g,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>m,staticGenerationAsyncStorage:()=>f});var s={};t.r(s),t.d(s,{OPTIONS:()=>p,POST:()=>l});var a=t(5468),r=t(2197),n=t(4694),i=t(5685);let c=`Eres el asistente virtual de Vonnect, una empresa l\xedder en reclutamiento de talento tecnol\xf3gico y soluciones digitales. Tu misi\xf3n es ayudar a los visitantes proporcionando informaci\xf3n precisa y \xfatil sobre nuestros servicios.

INFORMACI\xd3N SOBRE VONNECT:
- Especialistas en contrataci\xf3n remota de desarrolladores y profesionales de tecnolog\xeda
- Ofrecemos desarrollo de software personalizado y consultor\xeda estrat\xe9gica
- Conectamos empresas con talento tech de alta calidad a nivel global
- Priorizamos las conexiones aut\xe9nticas y el ajuste cultural, no solo las habilidades t\xe9cnicas
- Ayudamos a startups y PYMEs a desbloquear su potencial completo

SERVICIOS PRINCIPALES:
1. Reclutamiento Remoto: Contrataci\xf3n de desarrolladores, ingenieros de software, y especialistas en tecnolog\xeda
2. Desarrollo de Software: Soluciones personalizadas para web, m\xf3vil y sistemas empresariales
3. Consultor\xeda Estrat\xe9gica: Asesor\xeda en transformaci\xf3n digital y arquitectura tecnol\xf3gica
4. Red de Talento: Acceso a una comunidad global de profesionales tech

CONTACTO:
- Email: info@vonnect.net
- Tel\xe9fono: +525578910193
- Sitio web: https://vonnect.net

IDIOMAS:
- Responde en espa\xf1ol cuando el usuario escriba en espa\xf1ol
- Responde en ingl\xe9s cuando el usuario escriba en ingl\xe9s
- Mant\xe9n un tono profesional pero amigable

INSTRUCCIONES:
- Proporciona respuestas claras y concisas
- Si no tienes informaci\xf3n espec\xedfica, ofrece ponerse en contacto con el equipo
- Menciona los beneficios \xfanicos de Vonnect cuando sea relevante
- Invita a explorar los servicios o contactar para m\xe1s informaci\xf3n
- Nunca inventes informaci\xf3n que no est\xe9 en este prompt`;async function l(e){try{let{message:o,conversation:t=[]}=await e.json();if(!o||"string"!=typeof o)return i.NextResponse.json({success:!1,error:"Message is required"},{status:400});let s=[{role:"system",content:c},...t.map(e=>({role:e.isUser?"user":"assistant",content:e.text})),{role:"user",content:o}];console.log("\uD83E\uDD16 Sending request to Abacus AI...");let a=await fetch("https://apps.abacus.ai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.ABACUSAI_API_KEY}`},body:JSON.stringify({model:"gpt-4.1-mini",messages:s,stream:!0,max_tokens:1e3,temperature:.7})});if(!a.ok)return console.error("❌ Abacus AI API error:",a.status,a.statusText),i.NextResponse.json({success:!1,error:"Failed to get AI response"},{status:500});let r=new ReadableStream({async start(e){let o=a.body?.getReader(),t=new TextDecoder,s=new TextEncoder;if(!o)throw Error("No reader available");try{let a="";for(;;){let{done:r,value:n}=await o.read();if(r)break;for(let o of t.decode(n).split("\n"))if(o.startsWith("data: ")){let t=o.slice(6);if("[DONE]"===t){let o=JSON.stringify({success:!0,message:a.trim(),isComplete:!0});e.enqueue(s.encode(`data: ${o}

`));return}try{let o=JSON.parse(t),r=o.choices?.[0]?.delta?.content||"";if(r){a+=r;let o=JSON.stringify({success:!0,chunk:r,message:a,isComplete:!1});e.enqueue(s.encode(`data: ${o}

`))}}catch(e){}}}}catch(t){console.error("❌ Stream error:",t);let o=JSON.stringify({success:!1,error:"Stream processing failed"});e.enqueue(s.encode(`data: ${o}

`)),e.error(t)}finally{e.close()}}});return new Response(r,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"}})}catch(e){return console.error("❌ Chat API error:",e),i.NextResponse.json({success:!1,error:"Internal server error",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}async function p(){return new Response(null,{headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type"}})}let u=new a.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/app/api/chat/route",pathname:"/app/api/chat",filename:"route",bundlePath:"app/app/api/chat/route"},resolvedPagePath:"C:\\Users\\pc\\Desktop\\BrainTask - Vonnect\\Vonnect_Web\\vonnect_redesign\\app\\app\\api\\chat\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:f,serverHooks:m}=u,x="/app/api/chat/route";function g(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:f})}}};var o=require("../../../../webpack-runtime.js");o.C(e);var t=e=>o(o.s=e),s=o.X(0,[343,769],()=>t(8459));module.exports=s})();