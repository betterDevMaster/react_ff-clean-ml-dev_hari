import Head from "next/head"
import { ChakraProvider, Flex, Box } from "@chakra-ui/react"
import { useState } from "react"
import CameraView from "../components/cameraView/CameraView"
import Sidebar from "../components/sidebar/Sidebar"
import dynamic from "next/dynamic"

const DynamicComponent = typeof window !== "undefined" && dynamic(() => import("../modules/camera.js"))

const Home = () => {
	const [isCameraLoaded, setIsCameraLoaded] = useState(false)
	const [recordCam, setRecordCam] = useState(false)
	const [downloadVideo, setDownloadVideo] = useState(false)
	const handleRecord = (status) => {
		setRecordCam(status)
	}
	const handleDownload = (status) => {
		setDownloadVideo(status)
	}

	return (
		<ChakraProvider>
			<Box>
				<Head>
					<title>PoseNet - Camera Feed Demo</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Box as="main" backgroundColor="black">
					{typeof window !== "undefined" ? <DynamicComponent setIsCameraLoaded={setIsCameraLoaded} /> : undefined}
					<Flex direction={{ base: "column", lg: "row" }} width="100vw" height="100vh">
						<Box width={{ base: "100%", lg: "60%" }}>
							<CameraView
								onRecord={handleRecord}
								onDownLoad={handleDownload}
								download={downloadVideo}
								showRecord={recordCam}
								isCameraLoaded={isCameraLoaded}
							/>
						</Box>
						<Box width={{ base: "100%", lg: "40%" }}>
							<Sidebar onRecord={handleRecord} onDownLoad={handleDownload} setIsCameraLoaded={setIsCameraLoaded} />
						</Box>
					</Flex>
				</Box>
			</Box>
		</ChakraProvider>
	)
}

export default Home
