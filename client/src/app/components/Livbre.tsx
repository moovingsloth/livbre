"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Component() {

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          리
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            브르
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-2xl text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div>
            <p style={{ color: "#2c3e50", fontSize: "1.2em" }}>안녕하세요, 저는 책 읽는 공룡 
              <span style={{ fontWeight: "bold", fontSize: "1.1em", color: "#4286ca" }}>&apos;리브로돈&apos;</span>이에요! </p>
            <p>가장 똑똑했던 공룡 &apos;트로오돈&apos;의 후예죠.</p>
            <p>요즘 &lt;닭이 공룡이라고?&gt;를 읽고 있답니다!</p>
            <p>제 친구 &apos;마이아&apos;가 빌려줬어요.</p>
          </div>
        </motion.p>
        <Link href="/books">
          <motion.div
            className="box"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "400px", // 크기 조정 (필요시 변경)
              height: "400px", // 크기 조정 (필요시 변경)
              backgroundColor: "#4286ca", // 배경색 설정 (필요시 삭제 가능) 
              border: "1px solid #4286ca", // 테두리 추가
              borderRadius: "100%", // 테두리 둥글게
            }}
          >
            <img src="/images/livbre_logo_circle.png" alt="Book Icon" className="h-30 w-30" />
          </motion.div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mt-16">
          {["SHARE", "LEARN", "GROW"].map((text, index) => (
            <motion.div
              key={text}
              className="bg-blue-50 p-6 rounded-lg text-center shadow-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-600">{text}</h2>
              <p className="text-sm text-gray-600">
                {text === "SHARE" && "Contribute your books to our community library."}
                {text === "LEARN" && "Discover new worlds through shared literature."}
                {text === "GROW" && "Expand your knowledge and nurture your mind."}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}