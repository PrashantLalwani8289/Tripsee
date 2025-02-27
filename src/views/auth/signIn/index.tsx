import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form"
import { ILoginSchema, Token } from "Interface/authInterface";
import { yupResolver } from '@hookform/resolvers/yup';
import { mode } from '@chakra-ui/theme-tools';
import { loginSchema } from "ValidationSchema/Auth";
import { googleSignin, login } from "services/authService";
import { toastMessageError, toastMessageSuccess } from "components/utilities/CommonToastMessages";
import { setUser } from "State Management/Actions/rootReducer";
import { ROUTES } from "constants/routes";

type ButtonStyle = { bg: string };

function SignIn() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.400", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");

  const dispatch = useDispatch();
  const googleHover: ButtonStyle = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive: ButtonStyle = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { control, handleSubmit } = useForm<ILoginSchema>({
    mode: "onChange",
    resolver: yupResolver(loginSchema())
  });

  const onDataSubmit = async (data: ILoginSchema) => {
    console.log(data)
    const response = await login(data);
    if (response.success) {
      console.log(response)
      toastMessageSuccess("login successful")
      console.log(response.data.user)
      dispatch(setUser(response.data.user))
    } else {
      // Display error message
      toastMessageError("login failed")
    }

  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem", width: "100%" }}>

      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <GoogleOAuthProvider clientId="YOUR GOOGLE CLIENT ID">
              <GoogleLogin onSuccess={async (credentialResponse) => {
                const credential = credentialResponse.credential;
                try {
                  const token : Token = {
                    credentials : credential
                  }
                  const response = await googleSignin(token);
                  if (response && response.data && response.data.success) {
                    dispatch(setUser(response.data.user))
                    toastMessageSuccess("login successful")
                  }
                  if (response && response.data && !response.data.success) {
                    toastMessageError(response.data.message)
                  }
                }
                catch (e) {
                  toastMessageError(JSON.stringify(e))
                }

              }
              }
                onError={() => {
                  toastMessageError("Failed to sign in with Google")
                }
                }
              />
            </GoogleOAuthProvider>
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>
          <form onSubmit={handleSubmit(onDataSubmit)}>


            <FormControl>
              <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="email"
                    placeholder="mail@simmmple.com"
                    mb="24px"
                    fontWeight="500"
                    size="lg"
                  />
                )}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      isRequired
                      fontSize="sm"
                      placeholder="Min. 8 characters"
                      mb="24px"
                      size="lg"
                      type={show ? "text" : "password"}
                      variant="auth"
                    />
                  )}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
                  <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal" color={textColor} fontSize="sm">
                    Keep me logged in
                  </FormLabel>
                </FormControl>
                <Link to="/auth/forgot-password">
                  <Text color={textColorBrand} fontSize="sm" w="124px" fontWeight="500">
                    Forgot password?
                  </Text>
                </Link>
              </Flex>
              <Button fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50" mb="24px" type="submit" name="submit ">
                Sign In
              </Button>
            </FormControl>
          </form>
          <Flex flexDirection="column" justifyContent="center" alignItems="start" maxW="100%" mt="0px">
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <Link to={ROUTES.SIGNUP}>
                <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                  Create an Account
                </Text>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* <img src={illustration} style={{height:"600px"}} height={12} width={800}alt="illustrations" /> */}
    </div>
  );
}

export default SignIn;
