<?php
	require_once("config/connect.php");
	require_once("config/function.php");
	$response = array();
	$response["result"] = false;
	$type = (isset($_REQUEST["type"]) ? $_REQUEST["type"] : 'errors');
	$act = (isset($_REQUEST["act"]) ? $_REQUEST["act"] : 'underfine');
	$id = (isset($_REQUEST["id"]) ? $_REQUEST["id"] : 'underfine');
	if($type != "errors"){
		if($act != "underfine") {
			if($id == "underfine") {
				if($act == "add") {
					$checkform = true;
					if($type == "customer") {
						$id_customer = mysqli_result(mysqli_query($conn, "SELECT MAX(Id_Customer) FROM $type"), 0);
						$full_name_customer = (isset($_POST["full_name_customer"]) ? $_POST["full_name_customer"] : 'underfine');
						$sex_customer = (isset($_POST["sex_customer"]) ? $_POST["sex_customer"] : 'underfine');
						$email_customer = (isset($_POST["email_customer"]) ? $_POST["email_customer"] : 'underfine');
						$phone_number_customer = (isset($_POST["phone_number_customer"]) ? $_POST["phone_number_customer"] : 'underfine');
						$birthday_customer = (isset($_POST["birthday_customer"]) ? $_POST["birthday_customer"] : 'underfine');
						$address_customer = (isset($_POST["address_customer"]) ? $_POST["address_customer"] : 'underfine');
						if($full_name_customer == null  || $sex_customer == null || $email_customer == null || $phone_number_customer == null || $birthday_customer == null || $address_customer == null) {
							$checkform = false;
						}
						$sql = "INSERT INTO $type (`Id_Customer`, `Full_Name`, `Sex`, `Email`, `Phone_Number`, `BirthDay`, `Address`) VALUES ($id_customer+1, '$full_name_customer', $sex_customer, '$email_customer', '$phone_number_customer', '$birthday_customer', '$address_customer')";
					}

					if($type == "invoice") {
						$id_invoice = mysqli_result(mysqli_query($conn, "SELECT MAX(Id_Invoice) FROM $type"), 0);
						$id_customer = (isset($_POST["id_customer"]) ? $_POST["id_customer"] : 'underfine');
						$date_create_invoice = (isset($_POST["date_create_invoice"]) ? $_POST["date_create_invoice"] : 'underfine');
						if($id_customer == null || $date_create_invoice == null) {
							$checkform = false;
						}
						$sql = "INSERT INTO $type (`Id_Invoice`, `Id_Customer`, `Date_Create`) VALUES ($id_invoice+1, $id_customer, '$date_create_invoice')";
					}

					if($type == "invoice_details") {
						$id_invoice_details = mysqli_result(mysqli_query($conn, "SELECT MAX(Id_Invoice_Details) FROM $type"), 0);
						$id_invoice = (isset($_POST["id_invoice"]) ? $_POST["id_invoice"] : 'underfine');
						$id_customer = (isset($_POST["id_customer"]) ? $_POST["id_customer"] : 'underfine');
						$id_product = (isset($_POST["id_product"]) ? $_POST["id_product"] : 'underfine');
						$number_product = (isset($_POST["number_product"]) ? $_POST["number_product"] : 'underfine');
						$price_product = (isset($_POST["price_product"]) ? $_POST["price_product"] : 'underfine');
						$date_create_invoice_details = (isset($_POST["date_create_invoice_details"]) ? $_POST["date_create_invoice_details"] : 'underfine');
						if($id_customer == null || $id_product == null || $number_product == null || $price_product == null || $date_create_invoice_details == null) {
							$checkform = false;
						}
						$sql = "INSERT INTO $type (`Id_Invoice_Details`, `Id_Invoice`, `Id_Customer`, `Id_Product`, `Number`, `Price`, `Date_Create`) VALUES ($id_invoice_details+1, $id_invoice, $id_customer, $id_product, $number_product, $price_product, '$date_create_invoice_details')";
					}

					if($type == "product") {
						$id_product = mysqli_result(mysqli_query($conn, "SELECT MAX(Id_Product) FROM $type"), 0);
						$id_type_product = (isset($_POST["id_type_product"]) ? $_POST["id_type_product"] : 'underfine');
						$name_product = (isset($_POST["name_product"]) ? $_POST["name_product"] : 'underfine');
						$unit_product = (isset($_POST["unit_product"]) ? $_POST["unit_product"] : 'underfine');
						$price_product = (isset($_POST["price_product"]) ? $_POST["price_product"] : 'underfine');
						if($id_type_product == null || $name_product == null || $unit_product == null || $price_product == null) {
							$checkform = false;
						}
						$sql = "INSERT INTO $type (`Id_Product`, `Id_Type_Product`, `Name_Product`, `Unit`, `Price`) VALUES ($id_product+1, $id_type_product, '$name_product', '$unit_product', $price_product)";
					}

					if($type == "type_product") {
						$id_type_product = mysqli_result(mysqli_query($conn, "SELECT MAX(Id_Type) FROM $type"), 0);
						$name_type_product = (isset($_POST["name_type_product"]) ? $_POST["name_type_product"] : 'underfine');
						$description_type_product = (isset($_POST["description_type_product"]) ? $_POST["description_type_product"] : 'underfine');
						if($name_type_product == null || $description_type_product == null) {
							$checkform = false;
						}
						$sql = "INSERT INTO $type (`Id_Type`, `Type_Name`, `Type_Description`) VALUES ($id_type_product+1, '$name_type_product', '$description_type_product')";
					}

					if($checkform) {
						$result = mysqli_query($conn, $sql);
						if($result) {
							$response["result"] = true;
						}
					}
				}
			}else{
				if($act == "details" || $act == "edit") {
					if($type == "customer")
						$sql = "SELECT * FROM $type WHERE Id_Customer = $id";
					if($type == "invoice")
						$sql = "SELECT * FROM $type WHERE Id_Invoice = $id";
					if($type == "invoice_details")
						$sql = "SELECT * FROM $type WHERE Id_Invoice_Details = $id";
					if($type == "product")
						$sql = "SELECT * FROM $type WHERE Id_Product = $id";
					if($type == "type_product")
						$sql = "SELECT * FROM $type WHERE Id_Type = $id";
					$result = mysqli_query($conn, $sql);
					if($result) {
						$response[$act] = mysqli_fetch_assoc($result);
						$response["result"] = true;
					}
				}

				if($act == "editok") {
					$checkform = true;
					if($type == "customer") {
						$full_name_customer = (isset($_POST["full_name_customer"]) ? $_POST["full_name_customer"] : 'underfine');
						$sex_customer = (isset($_POST["sex_customer"]) ? $_POST["sex_customer"] : 'underfine');
						$email_customer = (isset($_POST["email_customer"]) ? $_POST["email_customer"] : 'underfine');
						$phone_number_customer = (isset($_POST["phone_number_customer"]) ? $_POST["phone_number_customer"] : 'underfine');
						$birthday_customer = (isset($_POST["birthday_customer"]) ? $_POST["birthday_customer"] : 'underfine');
						$address_customer = (isset($_POST["address_customer"]) ? $_POST["address_customer"] : 'underfine');
						if($full_name_customer == null  || $sex_customer == null || $email_customer == null || $phone_number_customer == null || $birthday_customer == null || $address_customer == null) {
							$checkform = false;
						}
						$sql = "UPDATE $type SET `Full_Name`='$full_name_customer', `Sex`=$sex_customer, `Email`='$email_customer', `Phone_Number`='$phone_number_customer', `BirthDay`='$birthday_customer', `Address`='$address_customer' WHERE `Id_Customer` = $id";
					}

					if($type == "invoice") {
						$id_customer = (isset($_POST["id_customer"]) ? $_POST["id_customer"] : 'underfine');
						$date_create_invoice = (isset($_POST["date_create_invoice"]) ? $_POST["date_create_invoice"] : 'underfine');
						if($id_customer == null || $date_create_invoice == null) {
							$checkform = false;
						}
						$sql = "UPDATE $type SET `Id_Customer`=$id_customer, `Date_Create`='$date_create_invoice' WHERE `Id_Invoice` = $id";
					}

					if($type == "invoice_details") {
						$id_invoice = (isset($_POST["id_invoice"]) ? $_POST["id_invoice"] : 'underfine');
						$id_customer = (isset($_POST["id_customer"]) ? $_POST["id_customer"] : 'underfine');
						$id_product = (isset($_POST["id_product"]) ? $_POST["id_product"] : 'underfine');
						$number_product = (isset($_POST["number_product"]) ? $_POST["number_product"] : 'underfine');
						$price_product = (isset($_POST["price_product"]) ? $_POST["price_product"] : 'underfine');
						$date_create_invoice_details = (isset($_POST["date_create_invoice_details"]) ? $_POST["date_create_invoice_details"] : 'underfine');
						if($id_customer == null || $id_product == null || $number_product == null || $price_product == null || $date_create_invoice_details == null) {
							$checkform = false;
						}
						$sql = "UPDATE $type SET `Id_Invoice`=$id_invoice, `Id_Customer`=$id_customer, `Id_Product`=$id_product, `Number`=$number_product, `Price`=$price_product, `Date_Create`='$date_create_invoice_details' WHERE `Id_Invoice_Details` = $id";
					}

					if($type == "product") {
						$id_type_product = (isset($_POST["id_type_product"]) ? $_POST["id_type_product"] : 'underfine');
						$name_product = (isset($_POST["name_product"]) ? $_POST["name_product"] : 'underfine');
						$unit_product = (isset($_POST["unit_product"]) ? $_POST["unit_product"] : 'underfine');
						$price_product = (isset($_POST["price_product"]) ? $_POST["price_product"] : 'underfine');
						if($id_type_product == null || $name_product == null || $unit_product == null || $price_product == null) {
							$checkform = false;
						}
						$sql = "UPDATE $type SET `Id_Type_Product`=$id_type_product, `Name_Product`='$name_product', `Unit`='$unit_product', `Price`=$price_product WHERE `Id_Product` = $id";
					}

					if($type == "type_product") {
						$name_type_product = (isset($_POST["name_type_product"]) ? $_POST["name_type_product"] : 'underfine');
						$description_type_product = (isset($_POST["description_type_product"]) ? $_POST["description_type_product"] : 'underfine');
						if($name_type_product == null || $description_type_product == null) {
							$checkform = false;
						}
						$sql = "UPDATE $type SET `Type_Name`='$name_type_product', `Type_Description`='$description_type_product' WHERE `Id_Type` = $id";
					}

					if($checkform) {
						$result = mysqli_query($conn, $sql);
						if($result) {
							$response["result"] = true;
						}
					}
				}

				if($act == "del") {
					if($type == "customer")
						$sql = "DELETE FROM $type WHERE Id_Customer = $id";
					if($type == "invoice")
						$sql = "DELETE FROM $type WHERE Id_Invoice = $id";
					if($type == "invoice_details")
						$sql = "DELETE FROM $type WHERE Id_Invoice_Details = $id";
					if($type == "product")
						$sql = "DELETE FROM $type WHERE Id_Product = $id";
					if($type == "type_product"){
						$sql = "DELETE FROM $type WHERE Id_Type = $id";
					}
					
					$result = mysqli_query($conn, $sql);
					if($result) {
						$response["result"] = true;
					}
				}
			}
		}else{
			$response[$type] = array();
			$sql = "SELECT * FROM $type";
			$result = mysqli_query($conn, $sql);
			if($result) {
				while($row = mysqli_fetch_assoc($result)) {
					array_push($response[$type], $row);
					$response["result"] = true;
				}
			}
		}
	}

	if(!$response["result"]) {
		$response["errors"] = "There is no data to show";
	}
	header("Content-type:application/json");
	echo json_encode($response);
?>