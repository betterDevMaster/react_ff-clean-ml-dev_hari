import React, { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import VideoRecorder from "react-video-recorder"

const CameraView = (props) => {
	const [selectedFile, setSelectedFile] = useState(null)

	const handleRecord = (status) => {
		props.onRecord(status)
	}

	useEffect(() => {
		if (props.download && selectedFile) downloadBlob(selectedFile, "record.mp4")
	}, [props.download])

	const downloadBlob = (blob, name = "record.mp4") => {
		// Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
		const blobUrl = URL.createObjectURL(blob)
		// Create a link element
		const link = document.createElement("a")
		// Set link's href to point to the Blob URL
		link.href = blobUrl
		link.download = name
		// Append link to the body
		document.body.appendChild(link)
		// Dispatch click event on the link
		// This is necessary as link.click() does not work on the latest firefox
		link.dispatchEvent(
			new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				view: window,
			}),
		)
		// Remove link from body
		document.body.removeChild(link)
		setSelectedFile(null)
		props.onRecord(false)
		props.onDownLoad(false)
	}

	return (
		<Box
			h="100vh !important"
			bgColor="black"
			// bgImage="url(assets/among-us-the-thing.png)"
			// bgSize="cover"
			position="relative"
			overflow="hidden"
			id="cc"
			className="canvas-container"
		>
			<Box
				position="absolute"
				fontSize={{ base: "3rem", md: "6rem", lg: "8rem" }}
				top="50%"
				left="50%"
				transform="translate(-50%,-50%)"
				display={props.isCameraLoaded ? "none" : "block"}
				id="loader"
				className="loading wave"
			>
				Loading
			</Box>
			<Box id="overlay" className="overlay cln"></Box>

			<Box id="main">
				<Box width="100%" height="100vh" as="video" id="video" download playsInline></Box>
			</Box>

			<Box as="canvas" id="output" className="camera-canvas" style={{ display: props.showRecord ? "nonw" : "block" }}></Box>
			{props.showRecord && (
				<VideoRecorder
					isOnInitially={true}
					isFlipped={true}
					onRecordingComplete={(videoBlob) => {
						// Do something with the video...
						setSelectedFile(videoBlob)
						// setRecordContinue(false)
						handleRecord(false)
					}}
				/>
			)}
			<Box as="canvas" width="100%" height="100vh" className="illustration-canvas"></Box>
		</Box>
	)
}

export default CameraView
