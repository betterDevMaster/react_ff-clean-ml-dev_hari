import { Box, Flex, Text, Heading, forwardRef, Input, InputGroup, InputRightElement, Image, Button } from "@chakra-ui/react"
import { motion, isValidMotionProp } from "framer-motion"
import RecordIcon from "../../icons/record"
import StopIcon from "../../icons/stop"
import ShuffleIcon from "../../icons/shuffle"
import DownloadIcon from "../../icons/download"
import SocialShareIcon from "../../icons/socialMedia"
import ShareBar from "../shareBar"
import { useState, useRef } from "react"

const MotionBox = motion.custom(
	forwardRef((props, ref) => {
		const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)))
		return <Box ref={ref} {...chakraProps} />
	}),
)

const MotionHeading = motion.custom(
	forwardRef((props, ref) => {
		const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)))
		return <Heading ref={ref} {...chakraProps} />
	}),
)

const MotionText = motion.custom(
	forwardRef((props, ref) => {
		const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)))
		return <Text ref={ref} fontWeight="700" fontSize={{ base: "14px", md: "14px", xl: "20px" }} {...chakraProps} />
	}),
)

const API_KEY = "Zm5BRUIzRnJQTUFDQlBaeXZFcjdNcmEzNkpVbEw2WmVXczZqN1V6MTplbWFpbF9zdWJzY3JpcHRpb25fZGV2OnNlcnZlcg=="

const Sidebar = (props) => {
	const [isShareBarShown, setIsShareBarShown] = useState(false)
	const [inputValue, setInputValue] = useState(undefined)
	const inputRef = useRef(undefined)

	const request = async (email, unsubscribe = false) => {
		const headers = new Headers()

		headers.append("Authorization", `Basic ${API_KEY}`)
		headers.append("Content-Type", "application/json")

		const subQuery = "mutation Subscribe($email: String!) {\n  subscribe(email: $email)\n}"
		const unsubQuery = "mutation Unsubscribe($email: String!) {\n  unsubscribe(email: $email)\n}"

		return fetch("https://graphql.fauna.com/graphql", {
			method: "POST",
			headers,
			body: JSON.stringify({
				query: unsubscribe ? unsubQuery : subQuery,
				variables: { email: email },
			}),
		}).then((response) => response.json())
	}

	const subscribe = async (email) => {
		const res = await request(email)

		try {
			if (res.data.subscribe) {
				alert("Subscribed!")
			}
		} catch (e) {
			alert("Email has already subscribed")
		}
	}

	return (
		<Flex
			direction="column"
			alignItems="stretch"
			justifyContent="space-between"
			maxWidth={{ base: "100%", lg: "670px" }}
			overflow="hidden"
			height={{ base: "auto", lg: "100vh" }}
			backgroundColor="#121c30"
			id="sb"
		>
			<Flex position="relative" backgroundColor="#e2e8f0" height="100%" alignItems="center">
				<MotionBox
					className="controls"
					position="absolute"
					width="100%"
					height="100%"
					animate={{
						x: [0, 5, 0, -5, 0],
					}}
					transition={{
						duration: 6,
						times: [0, 0.25, 0.5, 0.75, 1],
						repeat: Infinity,
						repeatDelay: 0,
						ease: "linear",
					}}
				></MotionBox>
				<Box position="relative" zIndex="2" margin="auto">
					<Box margin="10" marginTop={{ base: "50px" }}>
						<Flex alignItems="center" justifyContent="center">
							<Box position="relative">
								<MotionHeading
									as="h1"
									position="absolute"
									zIndex="1"
									color="black"
									animate={{
										x: [-1, -3.0, -6, -4, -2, -1],
										y: [-1, -3.0, -6, -4, -2, -1],
									}}
									transition={{
										duration: 4,
										times: [0, 0.2, 0.4, 0.6, 0.8, 1],
										repeat: Infinity,
										repeatDelay: 0,
										ease: "linear",
									}}
								>
									Flash Fashion
								</MotionHeading>
								<MotionHeading
									as="h1"
									position="absolute"
									zIndex="2"
									animate={{
										x: [0, -1.5, -3.0, -2, -1.0],
										y: [0, -1.5, -3.0, -2, -1.0],
										color: ["#000", "#27C4F6", "#FA61E7", "#F2F600", "#99FDC1"],
									}}
									transition={{
										duration: 4,
										times: [0, 0.25, 0.5, 0.75, 1],
										repeat: Infinity,
										repeatDelay: 0,
										ease: "linear",
									}}
								>
									Flash Fashion
								</MotionHeading>
								<MotionHeading as="h1" position="relative" zIndex="3" color="white">
									Flash Fashion
								</MotionHeading>
							</Box>
						</Flex>
						<Text textAlign="right" fontSize={{ base: "14px" }} fontStyle="italic" lineHeight={{ md: "8" }}>
							wear digi . when moo?
						</Text>
					</Box>
					<Box
						marginX="10"
						backgroundColor="#fff"
						boxShadow="-10px -6px #000"
						border="2px solid"
						borderWidth="3px"
						maxWidth={{ md: "75%", "2xl": "85%" }}
						paddingX={{ base: "4", md: "8", xl: "12" }}
						margin={{ base: "30px", md: "auto" }}
						marginBottom="50px !important"
						className="control-wrapper"
					>
						<Text
							fontStyle="italic"
							fontSize="8px"
							lineHeight="15px"
							textAlign="center"
							marginY={{ base: "4" }}
							display={{ base: "block", lg: "none" }}
						>
							FLASH FASHION is an experience optimized for larger screens
						</Text>
						<Box>
							<Flex flexDirection="row" justifyContent="space-around" marginY={{ lg: "6", "2xl": "18" }}>
								<RecordIcon id="startButton" onClick={() => props.onRecord(true)} />
								{/* <StopIcon id="stopButton" onClick={() => handleRecord(false)} /> */}
								<ShuffleIcon id="shuffleButton" />
								<DownloadIcon id="downloadButton" onClick={() => props.onDownLoad(true)} />
							</Flex>
							<InputGroup marginY={{ base: "4" }} position="relative">
								<Input
									paddingY="2"
									height="60px"
									variant="outline"
									fontSize="12px"
									border="2px solid #000000 !important"
									borderRadius="13px"
									position="relative"
									ref={inputRef}
									background="url('/assets/Rectangle.png')"
									onChange={(event) => setInputValue(event.currentTarget.value)}
								/>
								<Box
									position="absolute"
									top="50%"
									transform="translateY(-50%)"
									left={{ base: "4", md: "6" }}
									width="65%"
									display={inputRef?.current && inputRef.current.value ? "none" : "block"}
									onClick={() => inputRef.current.focus()}
								>
									<MotionText
										position="absolute"
										zIndex="1"
										color="black"
										animate={{
											x: [-1.0, -3.0, -6.0, -4.0, -2.0, -1.0],
											y: [-1.0, -3.0, -6.0, -4.0, -2.0, -1.0],
										}}
										transition={{
											duration: 4,
											times: [0, 0.2, 0.4, 0.6, 0.8, 1],
											repeat: Infinity,
											repeatDelay: 0,
											ease: "linear",
										}}
										color="black"
									>
										DROP YOUR EMAIL
									</MotionText>
									<MotionText
										position="absolute"
										zIndex="2"
										animate={{
											x: [0, -1.5, -3.0, -2.0, -1.0],
											y: [0, -1.5, -3.0, -2.0, -1.0],
											color: ["#000", "#27C4F6", "#FA61E7", "#F2F600", "#99FDC1"],
										}}
										transition={{
											duration: 4,
											times: [0, 0.25, 0.5, 0.75, 1],
											repeat: Infinity,
											repeatDelay: 0,
											ease: "linear",
										}}
									>
										DROP YOUR EMAIL
									</MotionText>
									<MotionText position="relative" zIndex="3" color="white">
										DROP YOUR EMAIL
									</MotionText>
								</Box>
								<InputRightElement
									top="50%"
									marginLeft="4"
									marginRight="3"
									borderLeft="1px solid black"
									transform="translateY(-50%)"
									children={
										<Button
											width="40px"
											maxWidth="8"
											padding="0px"
											marginLeft="2"
											onClick={() => {
												if (/.+@.+\.[A-Za-z]+$/.test(inputValue)) {
													subscribe(inputValue)
												} else {
													console.log("invalid email")
												}
											}}
										>
											<Image src={"assets/icons/cta_btn_bg.png"} alt="submit" />
										</Button>
									}
								/>
							</InputGroup>
							<Flex alignItems="center" justifyContent="center" marginY={{ base: "4" }}>
								<Text fontSize="12px" marginRight={{ base: "4" }}>
									Get in touch & share with friends to unlock a taste of the next level
								</Text>
								<SocialShareIcon onClick={() => setIsShareBarShown(!isShareBarShown)} />
							</Flex>
							{isShareBarShown && <ShareBar />}
						</Box>
					</Box>
				</Box>
			</Flex>
			<video id="background-video" autoPlay loop muted>
				<source src={"/assets/mobileFF/videos/pattern-flag-t2213xp15113_01.mp4"} type="video/mp4" />
			</video>
		</Flex>
	)
}

export default Sidebar
