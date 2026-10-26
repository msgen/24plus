<?php

namespace App\Helpers;

class ImageHelper
{
    /// <summary>
    ///     Creates the in place editor for changing image.
    /// </summary>
    /// <param name="htmlAttributes">The HTML attributes.</param>
    /// <param name="dataAttributes"></param>
    /// <returns></returns>
    public static function CreateInPlaceEditorForChangingImage($htmlAttributes, $dataAttributes)
    {
        return ImageHelper::CreateInPlaceEditorForImage(ImageEditableType::Change, $htmlAttributes, $dataAttributes);
    }

    /// <summary>
    ///     Creates the in place editor for adding image.
    /// </summary>
    /// <param name="htmlAttributes">The HTML attributes.</param>
    /// <param name="dataAttributes"></param>
    /// <returns></returns>
    public static function CreateInPlaceEditorForAddingImage($htmlAttributes, $dataAttributes)
    {
        return ImageHelper::CreateInPlaceEditorForImage(ImageEditableType::Add, $htmlAttributes, $dataAttributes);
    }

    /// <summary>
    /// Creates the delete image helper.
    /// </summary>
    /// <param name="helper">The helper.</param>
    /// <param name="htmlAttributes">The HTML attributes.</param>
    /// <param name="dataAttributes">The data attributes.</param>
    /// <returns></returns>
    public static function CreateDeleteImageHelper($htmlAttributes, $dataAttributes)
    {
        $div = new TagBuilder("div", ["class" => "img-delete"]);

        $attributes = ["class" => "fa fa-times-circle"];
        $span = new TagBuilder("i", array_merge($attributes, $htmlAttributes, $dataAttributes));
        $div->setText($span->render());

        return $div->render();
    }

    /// <summary>
    /// Creates the promote to homepage image helper.
    /// </summary>
    /// <param name="helper">The helper.</param>
    /// <param name="htmlAttributes">The HTML attributes.</param>
    /// <param name="dataAttributes">The data attributes.</param>
    /// <returns></returns>
    public static function CreatePromoteToHomepageImageHelper($htmlAttributes, $dataAttributes, $promoted = false)
    {
        $divCssClass = "img-promote";
        if($promoted){
            $divCssClass .= " promoted";
        }
        $div = new TagBuilder("div", ["class" => $divCssClass]);

        $attributes = ["class" => "fa fa-check-circle"];
        $span = new TagBuilder("i", array_merge($attributes, $htmlAttributes, $dataAttributes));
        $div->setText($span->render());

        return $div->render();
    }

    /// <summary>
    ///     Returns an unique identifier (guid)
    /// </summary>
    public static function guid()
    {
        if (function_exists('com_create_guid') === true) {
            return trim(com_create_guid(), '{}');
        }

        $data = openssl_random_pseudo_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /// <summary>
    ///     Create the thumbnail of an image
    /// </summary>
    public static function createThumbnailImage($imagePath, $saveTo)
    {
        $imagick = new \Imagick($imagePath);
        $imagick->setbackgroundcolor('rgb(255, 255, 255)');
        $imagick->thumbnailImage(270, 220, true, true);
        
        //$saveToFileHandle = fopen($saveTo, "wb");
        return $imagick->writeImage($saveTo);
    }

    /// <summary>
    ///     Creates the in place editor for image.
    /// </summary>
    /// <param name="helper">The helper.</param>
    /// <param name="type">The type of editable.</param>
    /// <param name="htmlAttributes">The HTML attributes.</param>
    /// <param name="dataAttributes">The data attributes.</param>
    /// <returns></returns>
    private static function CreateInPlaceEditorForImage($type, $htmlAttributes, $dataAttributes)
    {
        $text = "";
        $cssClass = "";
        switch ($type) {
            case ImageEditableType::Add:
                $text = "Adaugati imagine";
                $cssClass = "add-image";
                break;
            case ImageEditableType::Change:
                $text = "Schimbati imaginea";
                $cssClass = "change-image";
                break;
        }
        $guid = $dataAttributes['data-input-id'];
        $div = new TagBuilder("div", [
            "class" => "img-editable {$cssClass}"
            , "data-input-id" => $guid]);
        $span = new TagBuilder("span");
        $span->setText($text);

        $attributes = ["id" => $guid
            , "class" => "d-none"
            , "type" => "file"
            , "data-target" => "#g-" . $guid
            , "accept" => ".png,.jpeg,.jpg,.gif,.tif,.tiff"];
        $input = new TagBuilder("input", array_merge($attributes, $htmlAttributes, $dataAttributes));
        $div->setText($span->render() . $input->render());

        return $div->render();
    }
}
